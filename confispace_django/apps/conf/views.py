from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework import permissions
from apps.conf.models import Space, Holiday
from apps.conf.serializers import HolidayBasicSerializer, HolidaySerializer, SpaceBasicSerializer, SpaceSerializer
from apps.utilities.views import BaseViewSet

""" SPACES """


class SpaceGeneralViewSet(ListAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceBasicSerializer


class SpaceDetailedViewSet(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class SpaceDetailsViewSet(RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class CreateSpaceoAPIView(BaseViewSet, CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class UpdateSpaceAPIView(BaseViewSet, UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class DeleteSpaceAPIView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


""" HOLIDAYS """


class HolidaysListView(ListAPIView):
    serializer_class = HolidayBasicSerializer

    def get_queryset(self):
        return Holiday.objects.filter(is_active=True)


class HolidaysListCreateView(BaseViewSet, ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer


class HolidayRetrieveUpdateView(BaseViewSet, RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer


class HolidayDestroyView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer
