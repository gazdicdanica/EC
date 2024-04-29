# Generated by Django 5.0.4 on 2024-04-24 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timer_app', '0002_message_ip_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='Timer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField(default=0)),
                ('running', models.BooleanField(default=False)),
            ],
        ),
    ]
