from django.contrib import admin
from apps.conf.models import Holiday, Schedule, Space

@admin.register(Space)
class SpaceAdmin(admin.ModelAdmin):
    pass

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    pass

@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    pass


