# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=255, blank=True, null=True)),
                ('created', models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 50, 10, 451081, tzinfo=utc))),
                ('updated', models.DateTimeField(default=datetime.datetime(2015, 11, 30, 21, 50, 10, 451116, tzinfo=utc))),
            ],
        ),
        migrations.CreateModel(
            name='RouteHasOwners',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL, db_column='owner_id')),
                ('route', models.ForeignKey(to='route.Route', db_column='route_id')),
            ],
        ),
        migrations.AddField(
            model_name='route',
            name='owners',
            field=models.ManyToManyField(related_name='owned_routes', through='route.RouteHasOwners', to=settings.AUTH_USER_MODEL),
        ),
    ]
