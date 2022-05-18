from django.db import models

class Space(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    max_spots = models.IntegerField()
    is_active = models.BooleanField(default=True)
    increments = models.IntegerField()
    max_booking_days =  models.IntegerField()
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Espacio'
        verbose_name_plural = 'Espacios'
        ordering = ['name']


class Schedule(models.Model):
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

class Holidays(models.Model):
    date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name = 'Día feriado'
        verbose_name_plural = 'Días feriados'
        