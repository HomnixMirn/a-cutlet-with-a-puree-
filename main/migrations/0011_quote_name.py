# Generated by Django 5.1.3 on 2024-11-23 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_quote_citation'),
    ]

    operations = [
        migrations.AddField(
            model_name='quote',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
