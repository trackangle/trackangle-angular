# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0004_auto_20160311_1616'),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('place_id', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Museum',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('place_id', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('place_id', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='route',
            name='food',
        ),
        migrations.RemoveField(
            model_name='route',
            name='museum',
        ),
        migrations.RemoveField(
            model_name='route',
            name='shop',
        ),
        migrations.AddField(
            model_name='shop',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
        migrations.AddField(
            model_name='museum',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
        migrations.AddField(
            model_name='food',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
    ]
