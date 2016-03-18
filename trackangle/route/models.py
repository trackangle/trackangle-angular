from django.db import models
from trackangle.authentication.models import Account
from trackangle.place.models import Place
from trackangle.route.managers import RouteManager


class Route(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    owners = models.ManyToManyField(Account, through='RouteHasOwners',
                                    related_name='owned_routes')
    url_title = models.CharField(max_length=100, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    places = models.ManyToManyField(Place, through='RouteHasPlaces',)

    objects = RouteManager()


class RouteHasOwners(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    owner = models.ForeignKey(Account, db_column='owner_id')


class RouteHasPlaces(models.Model):
    route = models.ForeignKey(Route, db_column='route_id')
    place = models.ForeignKey(Place, db_column='place_id')

    class Meta:
        unique_together = (("route", "place"))
