from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import permissions
from knox.models import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from apps.sec.serializers import RegisterSerializer, UserSerializer

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
        d = login(request, user)
        #return super(LoginAPI, self).post(request, format=None)
        return Response({
            'user': {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "username": user.username
            }, 
            'token': AuthToken.objects.create(user)[1]
        })
