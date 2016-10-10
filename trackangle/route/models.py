from django.db import models
from trackangle.authentication.models import Account
from trackangle.place.models import Place, City
from trackangle.route.managers import RouteManager


class Route(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    owners = models.ManyToManyField(Account, through='RouteHasOwners',
                                    related_name='owned_routes')
    url_title = models.SlugField(max_length=100, blank=True, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    places = models.ManyToManyField(Place, through='RouteHasPlaces',)

    objects = RouteManager()


class RouteHasOwners(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    owner = models.ForeignKey(Account, db_column='owner_id')

    class Meta:
        unique_together = ("route", "owner",)


class RouteHasPlaces(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    place = models.ForeignKey(Place, db_column='place_id')

    class Meta:
        unique_together = ("route", "place",)


class RouteHasCities(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    city = models.ForeignKey(City, db_column='city_id')

    class Meta:
        unique_together = ("route", "city",)