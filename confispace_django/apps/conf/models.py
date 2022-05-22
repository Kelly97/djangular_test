from django.db import models

from apps.utilities.models import ModelBase

class Space(ModelBase):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100, blank=True, null=True)
    max_spots = models.IntegerField()
    is_active = models.BooleanField(default=True)
    increments = models.IntegerField()
    max_booking_days =  models.IntegerField()
    daily_max_bookings =  models.IntegerField(blank=True, null=True)
    weekly_max_bookings =  models.IntegerField(blank=True, null=True)
    time_by_range =  models.BooleanField(default=False)
    capacity =  models.IntegerField()

    class Meta:
        verbose_name = 'Espacio'
        verbose_name_plural = 'Espacios'
        ordering = ['name']
        db_table = 'spaces'


class Schedule(ModelBase):
    DAYS_OF_WEEK = (
        (1, 'Lunes'),
        (2, 'Martes'),
        (3, 'Miércoles'),
        (4, 'Jueves'),
        (5, 'Viernes'),
        (6, 'Sábado'),
        (7, 'Domingo'),
    )
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    day = models.CharField(max_length=1, choices=DAYS_OF_WEEK)
    start_time =  models.TimeField()
    end_time =  models.TimeField()

    class Meta:
        verbose_name = 'Horario'
        verbose_name_plural = 'Horarios'
        db_table = 'schedules'

class Holiday(ModelBase):
    date = models.DateField()
    description = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    class Meta:
        verbose_name = 'Día festivo'
        verbose_name_plural = 'Días festivos'
        db_table = 'holidays'
    
        