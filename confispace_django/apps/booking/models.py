from django.db import models
from apps.conf.models import Schedule
from apps.sec.models import User
from apps.utilities.models import ModelBase


class Booking(ModelBase):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        verbose_name="Usuario", 
        help_text="Usuario al que corresponde la reserva.",)
    schedule = models.ForeignKey(
        Schedule, 
        on_delete=models.CASCADE,
        verbose_name="Horario", 
        help_text="Horario seleccionado.",)
    start_time =  models.TimeField(
        verbose_name="Hora inicial", 
        help_text="Hora inicial del intervalo disponible en el día determinado.",)
    end_time =  models.TimeField(
        verbose_name="Hora final", 
        help_text="Hora final del intervalo disponible en el día.",)
    date = models.DateField(
        verbose_name="Fecha", 
        help_text="Fecha reservada.",)

    def __str__(self):
        return str(self.user) + " [" + str(self.start_time) + " - " + str(self.end_time) + "] " + str(self.schedule)
    
    class Meta:
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
        db_table = 'bookings'

