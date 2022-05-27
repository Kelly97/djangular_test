from rest_framework import serializers
from apps.conf.models import Space


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
