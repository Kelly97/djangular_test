from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework import permissions, views
from apps.conf.models import Schedule, Space, Holiday
from apps.conf.serializers import HolidayBasicSerializer, HolidaySerializer, SpaceBasicSerializer, SpaceSchedulesSerializer, SpaceSerializer, SpaceStatuserializer
from apps.utilities.views import BaseViewSet
from rest_framework.response import Response
from collections import defaultdict
from rest_framework import status

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

class UpdateSpaceSchedulesAPIView(BaseViewSet, ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        records = request.data.get("schedules")
        records_ids = request.data.get("schedules_ids")
        space_id = request.data.get("space_id")
        user = self.request.user

        records_to_delete = Schedule.objects.filter(space = space_id).exclude(id__in=records_ids)
        records_to_create = []
        records_to_update = []

        [
            records_to_update.append(record)
            if record["id"] is not None
            else records_to_create.append(record)
            for record in records
        ]
        
        [record.pop("id") for record in records_to_create]

        for values in records_to_create:
            values['space'] = space_id
            serializer = SpaceSchedulesSerializer(data=values)
            serializer.is_valid(raise_exception=True)
            schedule = self.perform_create(serializer)
        
        
        """ created_records = Schedule.objects.bulk_create(
            [Schedule(**values, space_id=space_id, created_by=user, updated_by=user) for values in records_to_create], 
            batch_size=1000
        ) """
        
        """ Schedule.objects.bulk_create(
            records_to_create,
            batch_size=1000
        ) """

        """ Schedule.objects.bulk_update(
            records_to_update, 
            ['start_time', 'end_time', 'updated_at','updated_by_id'], 
            batch_size=1000
        ) """

        """ Schedule.objects.bulk_update(
            [
                Schedule(id=values.get("id"), value=values.get("value"))
                for values in records_to_update
            ],
            ["value"],
            batch_size=1000
        ) """
        
        """ message = None
        if len(records_to_update) > 0 and len(records_to_create) > 0:
            http_status = status.HTTP_200_OK
        elif len(records_to_update) > 0 and len(records_to_create) == 0:
            http_status = status.HTTP_204_NO_CONTENT
        elif len(records_to_update) == 0 and len(records_to_create) > 0:
            http_status = status.HTTP_201_CREATED
            message = "Proceso terminado" """
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

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
