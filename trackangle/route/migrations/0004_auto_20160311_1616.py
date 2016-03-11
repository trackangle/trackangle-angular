# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0003_auto_20160310_0841'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='route',
            name='images',
        ),
        migrations.AlterField(
            model_name='route',
            name='id',
            field=models.AutoField(serialize=False, primary_key=True),
        ),
    ]
