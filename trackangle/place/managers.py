from django.db import models
from datetime import datetime
#from trackangle.place.models import Comment



class PlaceManager(models.Manager):

    def create(self, name, type, location_lat, location_lng, id, city, **kwargs):

        place = self.model(id=id, name=name, type=type, location_lat=location_lat, location_lng=location_lng, city_id=city['id'])
        place.save()
        return place

