from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('analyze/admin/', admin.site.urls),
    path('', include('engine.urls')),
]
