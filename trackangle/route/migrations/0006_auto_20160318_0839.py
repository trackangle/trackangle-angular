# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0005_auto_20160317_0843'),
    ]

    operations = [
        migrations.CreateModel(
            name='RouteHasFoods',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='RouteHasMuseums',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='RouteHasShops',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='food',
            name='id',
        ),
        migrations.RemoveField(
            model_name='food',
            name='route',
        ),
        migrations.RemoveField(
            model_name='museum',
            name='id',
        ),
        migrations.RemoveField(
            model_name='museum',
            name='route',
        ),
        migrations.RemoveField(
            model_name='shop',
            name='id',
        ),
        migrations.RemoveField(
            model_name='shop',
            name='route',
        ),
        migrations.AlterField(
            model_name='food',
            name='place_id',
            field=models.CharField(max_length=100, serialize=False, primary_key=True),
        ),
        migrations.AlterField(
            model_name='museum',
            name='place_id',
            field=models.CharField(max_length=100, serialize=False, primary_key=True),
        ),
        migrations.AlterField(
            model_name='route',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='route',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='shop',
            name='place_id',
            field=models.CharField(max_length=100, serialize=False, primary_key=True),
        ),
        migrations.AddField(
            model_name='routehasshops',
            name='owner',
            field=models.ForeignKey(to='route.Shop', db_column=b'shop_id'),
        ),
        migrations.AddField(
            model_name='routehasshops',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
        migrations.AddField(
            model_name='routehasmuseums',
            name='museum',
            field=models.ForeignKey(to='route.Museum', db_column=b'museum_id'),
        ),
        migrations.AddField(
            model_name='routehasmuseums',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
        migrations.AddField(
            model_name='routehasfoods',
            name='food',
            field=models.ForeignKey(to='route.Food', db_column=b'food_id'),
        ),
        migrations.AddField(
            model_name='routehasfoods',
            name='route',
            field=models.ForeignKey(to='route.Route', db_column=b'route_id'),
        ),
        migrations.AddField(
            model_name='route',
            name='food',
            field=models.ManyToManyField(related_name='owned_foods', through='route.RouteHasFoods', to='route.Food'),
        ),
        migrations.AddField(
            model_name='route',
            name='museum',
            field=models.ManyToManyField(related_name='owned_museums', through='route.RouteHasMuseums', to='route.Museum'),
        ),
        migrations.AddField(
            model_name='route',
            name='shop',
            field=models.ManyToManyField(related_name='owned_shops', through='route.RouteHasShops', to='route.Shop'),
        ),
    ]
