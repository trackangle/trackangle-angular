from django.utils.timezone import now
from django.db import models


class TimeStampedModel(object):
    created = models.DateTimeField(default=now(), null=False)
    updated = models.DateTimeField(default=now(), null=False)