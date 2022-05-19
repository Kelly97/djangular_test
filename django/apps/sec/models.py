from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    weekly_max_bookings = models.IntegerField(default=3)
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        db_table = 'users'