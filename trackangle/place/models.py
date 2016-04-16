from django.db import models
from trackangle.place.managers import PlaceManager

FOOD = 0
NIGHTLIFE = 1
ENTERTAINMENT_ARTS = 2
ARCHITECTURE_BUILDINGS = 3
OUTDOOR = 4
PLACE_TYPES = (
    (FOOD, 'food'),
    (NIGHTLIFE,'nightlife'),
    (ENTERTAINMENT_ARTS,'entertainment_arts'),
    (ARCHITECTURE_BUILDINGS,'architecture_buildings'),
    (OUTDOOR,'outdoor'),
)


class Place(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    location_lat = models.CharField(max_length=100)
    location_lng = models.CharField(max_length=100)
    type = models.IntegerField(choices=PLACE_TYPES)
    rating = models.FloatField()
    budget = models.FloatField()
    comment = models.CharField(max_length=1000)

    objects = PlaceManager()