from django.urls import path
from . import views
from .views import AllDataAPIView, AllQueueAPIView

urlpatterns = [
    path('analyze/engine/call/', views.queue_analysis, name='queue_analysis'),
    path('analyze/all_data/', AllDataAPIView.as_view(), name='all-data'),
    path('analyze/all_queue/', AllQueueAPIView.as_view(), name='all-queue'),
]
