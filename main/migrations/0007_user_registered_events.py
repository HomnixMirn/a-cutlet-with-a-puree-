# Generated by Django 5.1.2 on 2024-11-22 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_usertoken_id_usertoken_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='registered_events',
            field=models.ManyToManyField(blank=True, to='main.event'),
        ),
    ]