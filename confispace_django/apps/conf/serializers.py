from rest_framework import serializers
from apps.conf.models import Holiday, Schedule, Space
from apps.sec.serializers import groupSerializer

""" SPACES """

class SpaceBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['id',
                  'name',
                  'description',
                  'is_active',
                  'capacity']


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = "__all__"

class SpaceStatuserializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['id','is_active']

    def update(self, instance, validated_data):
        if instance.is_active == True:
            instance.is_active = False
        else:
            instance.is_active = True
        instance.save()
        return instance


class SpaceSchedulesSerializer(serializers.ModelSerializer):
    groups = groupSerializer(read_only=True, many=True)
    day_label = serializers.CharField(source='get_day_display')
    class Meta:
        model = Schedule
        fields = "__all__"


""" HOLIDAYS """


class HolidayBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = ['id', 'date', 'description']


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = "__all__"
