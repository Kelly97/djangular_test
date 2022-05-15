from rest_framework import serializers
from apps.sec.models import Users
from django.contrib.auth.models import Group

class UserSerializer(serializers.ModelSerializer):
    """ id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(required=False, allow_blank=True, max_length=100)
    username
    first_name
    last_name
    email
    weekly_max_bookings """

    class Meta:
        model = Users
        fields = ['id', 'username', 'weekly_max_bookings', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name", )