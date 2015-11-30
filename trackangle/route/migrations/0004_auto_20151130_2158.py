# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0003_auto_20151130_2157'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 58, 28, 723578, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='route',
            name='updated',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 58, 28, 723615, tzinfo=utc)),
        ),
    ]
