# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='upload',
            field=models.ImageField(upload_to='route', null=True),
        ),
    ]
