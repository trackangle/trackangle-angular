# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0006_auto_20160318_0839'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.CharField(max_length=100, serialize=False, primary_key=True)),
                ('type', models.IntegerField(choices=[(0, b'shop'), (1, b'museum'), (2, b'food')])),
            ],
        ),
        migrations.CreateModel(
            name='RouteHasPlaces',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('place', models.ForeignKey(to='route.Place', db_column=b'place_id')),
            ],
        ),
        migrations.RemoveField(
            model_name='routehasfoods',
            name='food',
        ),
        migrations.RemoveField(
            model_name='routehasfoods',
            name='route',
        ),
        migrations.RemoveField(
            model_name='routehasmuseums',
            name='museum',
        ),
        migrations.RemoveField(
            model_name='routehasmuseums',
            name='route',
        ),
        migrations.RemoveField(
            model_name='routehasshops',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='routehasshops',
            name='route',
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
        migrations.DeleteModel(
            name='Food',
        ),
        migrations.DeleteModel(
            name='Museum',
        ),
        migrations.DeleteModel(
            name='RouteHasFoods',
        ),
        migrations.DeleteModel(
            name='RouteHasMuseums',
        ),
        migrations.DeleteModel(
            name='RouteHasShops',
        ),
        migrations.DeleteModel(
            name='Shop',
        ),
        migrations.AddField(
            model_name='routehasplaces',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
        migrations.AddField(
            model_name='route',
            name='places',
            field=models.ManyToManyField(to='route.Place', through='route.RouteHasPlaces'),
        ),
    ]
