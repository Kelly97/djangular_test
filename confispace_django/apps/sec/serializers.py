from rest_framework import serializers, validators
from apps.sec.models import User
from django.contrib.auth.models import Group

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True}            
        }

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}            
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], 
            validated_data['email'], 
            validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
            )
        return user
