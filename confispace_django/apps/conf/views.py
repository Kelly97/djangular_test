from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework import permissions
from apps.conf.models import Space, Holiday
from apps.conf.serializers import HolidayBasicSerializer, HolidaySerializer, SpaceBasicSerializer, SpaceSerializer


""" SPACES """


class SpaceGeneralViewSet(ListAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceBasicSerializer


class SpaceDetailedViewSet(ListAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer


class SpaceDetailsViewSet(RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
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


""" HOLIDAYS """


class HolidaysListView(ListAPIView):
    serializer_class = HolidayBasicSerializer

    def get_queryset(self):
        return Holiday.objects.filter(is_active=True)


class HolidaysListCreateView(ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer


class HolidayRetrieveUpdateView(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer


class HolidayDestroyView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer
