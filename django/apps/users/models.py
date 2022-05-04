from django.contrib.auth.models import AbstractUser
from django.db import models

class Users(AbstractUser):
    weekly_max_bookings = models.IntegerField()
    
