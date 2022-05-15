from django.urls import path, include
from django.contrib.auth.models import User, Group
from django.contrib import admin

from apps.sec.views import GroupList, UserDetails, UserList
admin.autodiscover()

urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<pk>/', UserDetails.as_view()),
    path('groups/', GroupList.as_view()),
]