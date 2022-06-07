from rest_framework import serializers


class BaseSerializer(serializers.ModelSerializer):
    common_fields = ['created_by', 'created_at', 'updated_by', 'updated_at']