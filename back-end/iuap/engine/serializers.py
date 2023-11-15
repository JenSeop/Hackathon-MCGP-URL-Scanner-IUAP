from rest_framework import serializers
from .models import Data, Queue

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['d_id', 'd_date', 'd_data', 'd_status', 'd_url', 'd_ip']

class QueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Queue
        fields = ['q_id', 'q_try', 'd_id']