from django.utils.timezone import now
from django.db import models
from trackangle.authentication.models import Account


class Route(models.Model):

    title = models.CharField(max_length=100, blank=False, null=False);
    description = models.CharField(max_length=255, blank=True, null=True);
    owners = models.ManyToManyField(Account, through='RouteHasOwners',
                                    related_name='owned_routes')
    url_title = models.CharField(max_length=100, blank=False)
    created = models.DateTimeField(null=False)
    updated = models.DateTimeField(null=False)


class RouteHasOwners(models.Model):

    route = models.ForeignKey(Route, db_column='route_id')
    owner = models.ForeignKey(Account, db_column='owner_id')
