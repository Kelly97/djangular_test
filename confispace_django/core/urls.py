from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sec/', include('apps.sec.urls')),
    path('api/conf/', include('apps.conf.urls')),
]
