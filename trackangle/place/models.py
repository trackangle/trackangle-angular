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
    #TODO id field might be changed to unique field instead of primary key
    id = models.CharField(max_length=100, primary_key=True)
    location_lat = models.CharField(max_length=100)
    location_lng = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    type = models.IntegerField(choices=PLACE_TYPES)

    objects = PlaceManager()


class Comment(models.Model):
    place = models.ForeignKey(Place, db_column="place_id", related_name="comments")
    text = models.CharField(max_length=255)
    author = models.ForeignKey(Account, db_column="author_id", related_name="comments")
    created = models.DateTimeField(default=datetime.now)

    class Meta:
        unique_together = ("author", "place",)

    def __unicode__(self):
        return '%s' % (self.text)


class Rating(models.Model):
    place = models.ForeignKey(Place, db_column="place_id", related_name="ratings")
    rate = models.IntegerField()
    rater = models.ForeignKey(Account, db_column="rater_id", related_name="ratings")

    class Meta:
        unique_together = ("rater", "place",)

    def __unicode__(self):
        return '%d' % (self.rate)


class Budget(models.Model):
    place = models.ForeignKey(Place, db_column="place_id", related_name="budgets")
    budget = models.IntegerField()
    owner = models.ForeignKey(Account, db_column="owner_id", related_name="budgets")

    class Meta:
        unique_together = ("owner", "place",)

    def __unicode__(self):
        return '%d' % (self.budget)
