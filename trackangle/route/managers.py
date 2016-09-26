from django.db import models
from datetime import datetime
from django.utils import timezone
from django.forms.models import model_to_dict


class RouteManager(models.Manager):

    def create(self, title, description, url_title, **kwargs):

        if not str(url_title).startswith('/'):
            url_title = '/' + url_title

        now = datetime.now()
        now = timezone.make_aware(now, timezone.get_current_timezone())
        route = self.model(title=title, description=description, url_title=url_title,
                       created=now, updated=now)
        route.save()
        return route

    def update(self, id, title, description, url_title, **kwargs):

        if not str(url_title).startswith('/'):
            url_title = '/' + url_title

        route = self.get(id=id)
        now = datetime.now()
        now = timezone.make_aware(now, timezone.get_current_timezone())
        route.title = title
        route.description = description
        route.url_title = url_title
        route.updated = now
        route.save()
        return route