from django.db import models
from datetime import datetime


class PlaceManager(models.Manager):

    def create(self, id, type, location_lat, location_lng, city, **kwargs):

        place = self.model(id=id, type=type, location_lat=location_lat, location_lng=location_lng, city=city)
        place.save()
        return place
