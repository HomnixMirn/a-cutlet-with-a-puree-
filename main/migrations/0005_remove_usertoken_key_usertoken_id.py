# Generated by Django 5.1.2 on 2024-11-22 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_user_time_zone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usertoken',
            name='key',
        ),
        migrations.AddField(
            model_name='usertoken',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]
