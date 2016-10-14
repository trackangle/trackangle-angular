from django.db import models
from datetime import datetime
#from trackangle.place.models import Comment



class PlaceManager(models.Manager):

    def create(self, type, location_lat, location_lng, id, city, **kwargs):

        place = self.model(id=id, type=type, location_lat=location_lat, location_lng=location_lng, city_id=city)
        place.save()
        return place
