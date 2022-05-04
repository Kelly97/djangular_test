from django.db import models

class Events(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    max_spots = models.IntegerField()
    is_active = models.BooleanField(default=True)
    increments = models.IntegerField()
    min_booking_time =  models.IntegerField()
    max_booking_time =  models.IntegerField()
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
        ordering = ['name']


class Schedules(models.Model):
    DAYS_OF_WEEK = (
        (1, 'Lunes'),
        (2, 'Martes'),
        (3, 'Miércoles'),
        (4, 'Jueves'),
        (5, 'Viernes'),
        (6, 'Sábado'),
        (7, 'Domingo'),
    )
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    day = models.CharField(max_length=1, choices=DAYS_OF_WEEK)
    start_time =  models.TimeField()
    end_time =  models.TimeField()

class Holidays(models.Model):
    date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)