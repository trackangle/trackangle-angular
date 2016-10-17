from django.db import models
from datetime import datetime
from django.utils import timezone
from django.template.defaultfilters import slugify


class RouteManager(models.Manager):

    def create(self, title, description, **kwargs):
        url_title = slugify(title)
        now = datetime.now()
        now = timezone.make_aware(now, timezone.get_current_timezone())
        route = self.model(title=title, description=description, url_title=url_title,
                       created=now, updated=now)

        route.save()

        return route

    def update(self, url_title, title, description, **kwargs):
        route = self.get(url_title=url_title)
        now = datetime.now()
        now = timezone.make_aware(now, timezone.get_current_timezone())
        route.title = title
        route.description = description
        route.url_title = slugify(title)
        route.updated = now
        route.save()
        return route