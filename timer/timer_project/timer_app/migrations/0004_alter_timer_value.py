# Generated by Django 5.0.4 on 2024-04-24 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timer_app', '0003_timer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timer',
            name='value',
            field=models.IntegerField(default=86400),
        ),
    ]
