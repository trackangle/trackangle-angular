# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.CharField(max_length=100, serialize=False, primary_key=True)),
                ('location_lat', models.CharField(max_length=100)),
                ('location_lng', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('type', models.IntegerField(choices=[(0, b'accomodation'), (1, b'architecture'), (2, b'entertainment'), (3, b'food'), (4, b'nightlife'), (5, b'outdoor')])),
            ],
        ),
    ]
