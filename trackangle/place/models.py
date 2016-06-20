from django.db import models
from trackangle.place.managers import PlaceManager


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
    type = models.IntegerField(choices=PLACE_TYPES)

    objects = PlaceManager()