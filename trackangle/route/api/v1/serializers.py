from rest_framework import serializers

from trackangle.route.models import Route


class RouteSerializer(serializers.ModelSerializer):

    title = serializers.CharField()
    description = serializers.CharField()
    url_title = serializers.CharField()

    class Meta:
        model = Route
        fields = ('title', 'description', 'url_title',)
