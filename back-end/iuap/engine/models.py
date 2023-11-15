# models.py

from django.db import models

class Data(models.Model):
  d_id = models.AutoField(primary_key=True)
  d_date = models.DateTimeField(auto_now_add=True)
  d_data = models.JSONField(default=dict)
  d_status = models.CharField(max_length=10, default='false')
  d_url = models.CharField(max_length=255, null=True)
  d_ip = models.GenericIPAddressField(blank=True, null=True)

class Queue(models.Model):
  q_id = models.AutoField(primary_key=True)
  q_try = models.IntegerField(default=0)
  d_id = models.ForeignKey(Data, on_delete=models.CASCADE)
