# Generated by Django 4.0.4 on 2022-05-22 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sec', '0003_remove_user_weekly_max_bookings_alter_user_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(error_messages={'unique': 'A user with that email already exists.'}, max_length=254, unique=True, verbose_name='email address'),
        ),
    ]
