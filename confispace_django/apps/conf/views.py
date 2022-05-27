from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.generics import RetrieveAPIView
from apps.conf.models import Space
from apps.conf.serializers import SpaceBasicSerializer, SpaceSerializer


class SpaceGeneralViewSet(ListAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceBasicSerializer


class SpaceDetailedViewSet(ListAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer

class SpaceDetailsViewSet(RetrieveAPIView):
    #permission_classes = [IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class CreateSpaceoAPIView(CreateAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class UpdateSpaceAPIView(UpdateAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class DeleteSpaceAPIView(DestroyAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer
