# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0002_auto_20151130_2154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 57, 35, 52877, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='route',
            name='updated',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 57, 35, 52912, tzinfo=utc)),
        ),
    ]
