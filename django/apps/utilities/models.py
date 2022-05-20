from django.db import models
from apps.sec.models import User


class ModelBase(models.Model):

    created_at = models.DateTimeField('Fecha creado', auto_now_add=True)
    updated_at = models.DateTimeField('Fecha actualizado', auto_now=True)
    created_by = models.ForeignKey(User, verbose_name='Creado por', on_delete=models.DO_NOTHING, related_name='%(app_label)s_%(class)s_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, verbose_name='Actualizado por', on_delete=models.DO_NOTHING, related_name='%(app_label)s_%(class)s_updated_by', null=True, blank=True)

    class Meta:
        abstract = True
