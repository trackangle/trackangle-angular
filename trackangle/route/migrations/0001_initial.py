# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


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
                ('description', models.CharField(null=True, max_length=255, blank=True)),
                ('url_title', models.CharField(max_length=100)),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
                ('museum', models.CharField(max_length=100)),
                ('food', models.CharField(max_length=100)),
                ('shop', models.CharField(max_length=100)),
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
            field=models.ManyToManyField(through='route.RouteHasOwners', to=settings.AUTH_USER_MODEL, related_name='owned_routes'),
        ),
    ]
