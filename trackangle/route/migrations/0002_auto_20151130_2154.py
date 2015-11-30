# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 54, 18, 762623, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='route',
            name='updated',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 54, 18, 762661, tzinfo=utc)),
        ),
    ]
