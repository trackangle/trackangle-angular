from django.db import models
from datetime import datetime


class PlaceManager(models.Manager):

    def create_route(self, id, type, **kwargs):

        place = self.model(id=id, type=type)
        place.save()
        return place
