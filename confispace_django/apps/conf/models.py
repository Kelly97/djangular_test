from django.db import models
from apps.utilities.models import ModelBase


class Space(ModelBase):
    name = models.CharField(
        verbose_name="Nombre", 
        max_length=30, 
        help_text="Nombre designado a la sala o espacio.",)
    description = models.CharField(
        verbose_name="Descripción", 
        max_length=100, 
        blank=True, 
        null=True,
        help_text="Descripción del espacio.",)
    max_spots = models.IntegerField(
        verbose_name="Espacios disponibles",
        help_text="Número máximo de reservas simultáneas permitidas en un intérvalo o rango de tiempo.",)
    is_active = models.BooleanField(
        verbose_name="Activo", 
        default=True,
        help_text="Indica si el espacio está habilitado para reservar.",)
    increments = models.IntegerField(
        verbose_name="Incremento",
        help_text="Intervalos de tiempo para mostrar los horarios establecidos para el espacio (minutos)",)
    max_booking_days = models.IntegerField(
        verbose_name="Días máx. para reservar",
        help_text="Tiempo máximo en el que un usuario puede crear una reserva en el futuro (días)",)
    daily_max_bookings = models.IntegerField(
        verbose_name="Reservas máx. por día", 
        blank=True, 
        null=True,
        help_text="Máximo de reservas en el día por usuario",)
    weekly_max_bookings = models.IntegerField(
        verbose_name="Reservas máx. por semana", 
        blank=True, 
        null=True,
        help_text="Máximo de reservas en la semana por usuario",)
    time_by_range = models.BooleanField(
        verbose_name="Reserva por rango", 
        default=False,
        help_text="Determina el modo de selección de tiempo al momento de realizar una reserva",)
    capacity = models.IntegerField(
        verbose_name="Capacidad",
        help_text="Cantidad informativa de la capacidad de asistentes de la sala",)

    def __str__(self):
        return self.name

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
    space = models.ForeignKey(
        Space, 
        on_delete=models.CASCADE,
        verbose_name="Espacio",
        help_text="Espacio al que corresponde el horario.",)
    day = models.IntegerField(
        choices=DAYS_OF_WEEK,
        verbose_name="Día",
        help_text="Día de la semana (1-7 : Lunes - Domingo)",)
    start_time = models.TimeField(
        verbose_name="Hora inicial",
        help_text="Hora inicial del intervalo disponible en el día",)
    end_time = models.TimeField(
        verbose_name="Hora final",
        help_text="Hora final del intervalo disponible en el día",)

    def __str__(self):
        return str(self.space) + " (" + str(self.get_day_display()) + " - " + str(self.start_time) + " - " + str(self.end_time) + " )" 

    class Meta:
        verbose_name = 'Horario'
        verbose_name_plural = 'Horarios'
        db_table = 'schedules'


class Holiday(ModelBase):
    date = models.DateField(
        unique=True,
        error_messages={"unique": "A holiday with that date already exists.",},
        verbose_name="Fecha",
        help_text="Fecha correspondiente del feriado.",)
    description = models.CharField(
        max_length=100, 
        blank=True, 
        null=True,
        verbose_name="Descripción",
        help_text="Nombre del evento celebrado en el día festivo.",)
    is_active = models.BooleanField(
        default=True,
        verbose_name="Activo",
        help_text="Indica si el feriado está activo",)

    def __str__(self):
        return self.date

    class Meta:
        verbose_name = 'Día festivo'
        verbose_name_plural = 'Días festivos'
        db_table = 'holidays'
