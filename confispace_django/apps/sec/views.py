from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from apps.sec.models import User
from apps.sec.serializers import ChangePasswordSerializer, RegisterSerializer, UpdateProfileSerializer, UserProfileSerializer, UserSerializer


class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": serializer.data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response({
            'user': {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "username": user.username
            },
            'token': AuthToken.objects.create(user)[1]
        })


class UserProfile(RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'status': 'success',
            'code': status.HTTP_200_OK,
            'message': 'Password updated successfully',
            'data': []
        }
        return Response(response)

class UpdateProfileView(UpdateAPIView):
    serializer_class = UpdateProfileSerializer

    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
