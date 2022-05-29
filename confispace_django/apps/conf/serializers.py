from rest_framework import serializers
from apps.conf.models import Holiday, Space


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


class HolidayBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = ['id', 'date', 'description']


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = "__all__"
