from django.db import models
from trackangle.place.managers import PlaceManager


SHOP = 0
MUSEUM = 1
FOOD = 2
PLACE_TYPES = (
    (SHOP, 'shop'),
    (MUSEUM, 'museum'),
    (FOOD, 'food'),
)


class Place(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    type = models.IntegerField(choices=PLACE_TYPES)

    objects = PlaceManager()