from django.db import models
from datetime import datetime

class RouteManager(models.Manager):

    def create_route(self, title, description, url_title, museum, food, shop, **kwargs):
        print("Route: ", title)
        if not str(url_title).startswith('/'):
            url_title = '/' + url_title
        route = self.model(title=title, description=description, url_title=url_title,
                           museum = museum, food = food, shop = shop,
                           created=datetime.now(), updated=datetime.now())
        route.save()
        return route
