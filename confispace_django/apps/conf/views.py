from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework import permissions, views
from apps.conf.models import Schedule, Space, Holiday
from apps.conf.serializers import HolidayBasicSerializer, HolidaySerializer, SpaceBasicSerializer, SpaceSchedulesSerializer, SpaceSerializer, SpaceStatuserializer
from apps.utilities.views import BaseViewSet
from rest_framework.response import Response
from collections import defaultdict

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

class toggleSpaceStatusAPIView(BaseViewSet, UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceStatuserializer    


class DeleteSpaceAPIView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer

class SpaceSchedulesViewSet(views.APIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = SpaceSchedulesSerializer

    #def get_queryset(self):
    #    return Schedule.objects.filter(space = self.kwargs.get('space_pk'))

    def get(self, request, space_pk):
        items = Schedule.objects.filter(space = space_pk)
        schedules = defaultdict(list)
        serializer = SpaceSchedulesSerializer(items, many=True)
        for result in serializer.data:
            if schedules[result['day']]:
                schedules[result['day']]['ranges'].append(result)
            else:
                schedules[result['day']] = {
                    "day": result['day'], 
                    "label": result['day_label'],
                    "ranges": [result]}                
        return Response(schedules)

class UpdateSpaceSchedulesAPIView(BaseViewSet, UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    def get_object(self, ticket_id):
            try:
                return Schedule.objects.get(id=ticket_id)
            except EventTicket.DoesNotExist():
                raise status.HTTP_400_BAD_REQUEST
    

""" HOLIDAYS """

class HolidaysListView(ListAPIView):
    serializer_class = HolidayBasicSerializer

    def get_queryset(self):
        return Holiday.objects.filter(is_active=True)


class HolidaysListCreateView(BaseViewSet, ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all().order_by('-date')
    serializer_class = HolidaySerializer


class HolidayRetrieveUpdateView(BaseViewSet, RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer


class HolidayDestroyView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer
