# views.py

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Data, Queue
from rest_framework.permissions import AllowAny
from .engine_controller import engine_call
from django_q.tasks import async_task
from django_q.models import OrmQ
from rest_framework import generics
from .serializers import DataSerializer, QueueSerializer
import json


@api_view(['POST'])
@permission_classes([AllowAny])
def queue_analysis(request):
      json_data = json.loads(request.body.decode('utf-8'))
      d_url = json_data.get('url')
      d_ip = request.META.get('REMOTE_ADDR', None)

      data = Data(d_url=d_url, d_ip=d_ip)
      data.save()

      queue = Queue(d_id=data)
      queue.save()

      async_task("engine.views.process_analysis", data.d_id)

      return Response({"success": True, "message": d_url}, status=status.HTTP_201_CREATED)

def process_analysis(d_id):
      try:
            data = Data.objects.get(d_id=d_id)
            d_queue = Queue.objects.get(d_id=data)
            d_queue.q_try = d_queue.q_try + 1
            d_queue.save()
            
            if d_queue.q_try > 2:
                  dq_queue = OrmQ.objects.get(id=d_id)
                  dq_queue.delete()
                  d_queue.delete()
                  data.r_status = "error"
                  data.save()
            
      except Data.DoesNotExist:
            return
      
      d_url = data.d_url
      data.d_data = engine_call(d_id, d_url)
      data.save()

      
      try:
            data.d_status = "true"
            data.save()
            d_queue.delete()
      
      except Queue.DoesNotExist:
            pass

class AllDataAPIView(generics.ListAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    
class AllQueueAPIView(generics.ListAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer