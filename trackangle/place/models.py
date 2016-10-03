from django.db import models
from trackangle.place.managers import PlaceManager
from trackangle.authentication.models import Account
from datetime import datetime


ACCOMODATION = 0
ARCHITECTURE = 1
ENTERTAINMENT = 2
FOOD = 3
NIGHTLIFE = 4
OUTDOOR = 5

PLACE_TYPES = (
    (ACCOMODATION, 'accomodation'),
    (ARCHITECTURE, 'architecture'),
    (ENTERTAINMENT, 'entertainment'),
    (FOOD, 'food'),
    (NIGHTLIFE, 'nightlife'),
    (OUTDOOR, 'outdoor'),
)


class Place(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    location_lat = models.CharField(max_length=100)
    location_lng = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    type = models.IntegerField(choices=PLACE_TYPES)

    objects = PlaceManager()


class Comment(models.Model):
    place = models.ForeignKey(Place, db_column="place_id", related_name="comments")
    text = models.CharField(max_length=100, unique_for_date="created")
    author = models.ForeignKey(Account, db_column="author_id", related_name="comments")
    created = models.DateTimeField(default=datetime.now)

    class Meta:
        unique_together = ("author", "place",)

    def __unicode__(self):
        return '%s' % (self.text)

