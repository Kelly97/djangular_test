from django.db import models
from apps.conf.models import Schedule
from apps.sec.models import User
from apps.utilities.models import ModelBase


class Booking(ModelBase):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    start_time =  models.TimeField()
    end_time =  models.TimeField()
    date = models.DateField()
    
    class Meta:
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
        db_table = 'bookings'

