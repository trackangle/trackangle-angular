from django.utils.timezone import now
from django.db import models
from trackangle.authentication.models import Account
from trackangle.route.managers import RouteManager


class Shop(models.Model):
    # place_id = models.CharField(max_length=100, blank=False, null=False)
    place_id = models.CharField(max_length=100, primary_key=True)
    # route = models.ForeignKey(Route, db_column='route_id')


class Museum(models.Model):
    # place_id = models.CharField(max_length=100, blank=False, null=False)
    place_id = models.CharField(max_length=100, primary_key=True)
    # route = models.ForeignKey(Route, db_column='route_id')


class Food(models.Model):
    # place_id = models.CharField(max_length=100, blank=False, null=False)
    place_id = models.CharField(max_length=100, primary_key=True)
    # route = models.ForeignKey(Route, db_column='route_id')


class Route(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    owners = models.ManyToManyField(Account, through='RouteHasOwners',
                                    related_name='owned_routes')
    url_title = models.CharField(max_length=100, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    shops = models.ManyToManyField(Shop, through='RouteHasShops',)
    museums = models.ManyToManyField(Museum, through='RouteHasMuseums',)
    foods = models.ManyToManyField(Food, through='RouteHasFoods', )

    objects = RouteManager()


class RouteHasOwners(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    owner = models.ForeignKey(Account, db_column='owner_id')


class RouteHasMuseums(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    museum = models.ForeignKey(Museum, db_column='museum_id')


class RouteHasFoods(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    food = models.ForeignKey(Food, db_column='food_id')


class RouteHasShops(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    shop = models.ForeignKey(Shop, db_column='shop_id')


SHOP = 0
MUSEUM = 1
FOOD = 2
PLACE_TYPES = (
    (SHOP, 'shop'),
    (MUSEUM, 'museum'),
    (FOOD, 'food'),
)


