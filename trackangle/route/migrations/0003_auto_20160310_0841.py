# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0002_route_upload'),
    ]

    operations = [
        migrations.RenameField(
            model_name='route',
            old_name='upload',
            new_name='images',
        ),
    ]
