from rest_framework import serializers
from apps.conf.models import Holiday, Schedule, Space
from apps.sec.serializers import groupSerializer
from django.contrib.auth.models import Group

from apps.utilities.serializers import BaseSerializer

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

class SpaceSchedulesSerializer(BaseSerializer):
    groups = groupSerializer(many=True)
    day_label = serializers.CharField(read_only=True, source='get_day_display')
    class Meta:
        model = Schedule
        fields = "__all__"

class UpdateSpaceSchedulesSerializer(BaseSerializer):
    groups = groupSerializer(many=True)
    day_label = serializers.CharField(read_only=True, source='get_day_display')
    
    """ def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Su contraseña actual es incorrecta.')
        return value """

    def validate(self, data):
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError({'end_time': "La hora final no puede ser menor o igual a la hora inicial."})
        return data

    def get_or_create_groups(self, groups):
        groups_ids = []
        for group in groups:
            group_instance = Group.objects.filter(pk=group.get('id')).first()
            groups_ids.append(group_instance.pk)
        return groups_ids

    def create_or_update_groups(self, groups):
        groups_ids = []
        for group in groups:
            group_instance, created = Group.objects.update_or_create(pk=group.get('id'), defaults=group)
            groups_ids.append(group_instance.pk)
        return groups_ids

    def remove_groups(self, groups):
        schedule = self.get_object()
        groups_to_remove = [record.pop("id") for record in groups]
        schedule.groups.all().exclude()

    def create(self, validated_data):
        groups = validated_data.pop('groups', [])
        schedule = Schedule.objects.create(**validated_data)
        schedule.groups.set(self.get_or_create_groups(groups))
        return schedule

    def update(self, instance, validated_data):
        groups = validated_data.pop('groups', [])
        instance.groups.clear()
        instance.groups.set(self.get_or_create_groups(groups))
        fields = ['start_time', 'end_time']
        for field in fields:
            try:
                setattr(instance, field, validated_data[field])
            except KeyError:  # validated_data may not contain all fields during HTTP PATCH
                pass
        setattr(instance, 'updated_by', self.context['request'].user)
        instance.save()
        return instance

    class Meta:
        model = Schedule
        fields = "__all__"
        optional_fields = ['space', ]
        """ extra_kwargs = {
            'space': {'write_only': True}            
        }  """ 


""" HOLIDAYS """


class HolidayBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = ['id', 'date', 'description']


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = "__all__"
