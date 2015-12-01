# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0004_auto_20151130_2158'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='url_title',
            field=models.CharField(max_length=100, default='hede'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='route',
            name='created',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='route',
            name='updated',
            field=models.DateTimeField(),
        ),
    ]
