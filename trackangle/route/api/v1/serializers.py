from rest_framework import serializers

from trackangle.route.models import Route


class RouteSerializer(serializers.ModelSerializer):

    id = serializers.DecimalField
    title = serializers.CharField()
    description = serializers.CharField()
    url_title = serializers.CharField()
    museum = serializers.CharField()
    food = serializers.CharField()
    shop = serializers.CharField()

    class Meta:
        model = Route
        fields = ('id', 'title', 'description', 'url_title', 'museum', 'food', 'shop',)