from rest_framework import serializers
from trackangle.place.models import Place, Comment, Rating, Budget, City
from trackangle.route.models import RouteHasPlaces
from django.core.exceptions import ValidationError


class CitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    location_lat = serializers.CharField(max_length=100)
    location_lng = serializers.CharField(max_length=100)
    places = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ('id', 'name', 'location_lat', 'location_lng', 'places', 'route_set')

    def get_places(self, obj):
        route_places = RouteHasPlaces.objects.filter(route_id=self.context['route_id'])
        places = []
        for route_place in route_places:
            places += Place.objects.filter(id=route_place.place_id, city_id=obj.id)
        if len(places) != 0:
            serialized = PlaceSerializer(places, context=self.context, many=True)
            return serialized.data
        return []


class CommentSerializer(serializers.ModelSerializer):

    text = serializers.CharField(max_length=100)
    author = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    created = serializers.DateTimeField(required=False)

    class Meta:
        model = Comment
        fields = ('text', 'author', 'created')


class RatingSerializer(serializers.ModelSerializer):

    rate = serializers.IntegerField()
    rater = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    class Meta:
        model = Rating
        fields = ('rate', 'rater')


class BudgetSerializer(serializers.ModelSerializer):

    budget = serializers.IntegerField()
    owner = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    class Meta:
        model = Budget
        fields = ('budget', 'owner')


class PlaceSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    location_lat = serializers.CharField(max_length=100)
    location_lng = serializers.CharField(max_length=100)
    type = serializers.IntegerField()
    comments = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()
    budgets = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = ('id', 'name', 'location_lat', 'location_lng', 'type', 'comments', 'ratings', 'budgets', 'city', 'route_set')

    def get_comments(self, obj):
        #TODO: multiple/single comment/rating/budget issue must be solved with good practice
        comments = []
        if self.context and 'request' in self.context:
            comments = Comment.objects.filter(place_id=obj.id, author_id=self.context['request'].user.id)
        else:
            comments = Comment.objects.filter(place_id=obj.id)
        if len(comments) != 0:
            serialized = CommentSerializer(comments[0])
            return serialized.data
        return {}

    def get_ratings(self, obj):
        ratings = []
        if self.context and 'request' in self.context:
            ratings = Rating.objects.filter(place_id=obj.id, rater_id=self.context['request'].user.id)
        else:
            ratings = Rating.objects.filter(place_id=obj.id)
        if len(ratings) != 0:
            serialized = RatingSerializer(ratings[0])
            return serialized.data
        return {}

    def get_budgets(self, obj):
        budgets = []
        if self.context and 'request' in self.context:
            budgets = Budget.objects.filter(place_id=obj.id, owner_id=self.context['request'].user.id)
        else:
            budgets = Budget.objects.filter(place_id=obj.id)
        if len(budgets) != 0:
            serialized = BudgetSerializer(budgets[0])
            return serialized.data
        return {}

    def to_internal_value(self, data):

        id = data.get('id')
        name = data.get('name')
        city = data.get('city')
        location_lat = data.get('location_lat')
        location_lng = data.get('location_lng')
        type = data.get('type')


        #Perform data validation
        if not id:
            raise ValidationError({
                'id': 'This field is required.'
            })
        if not city:
            raise ValidationError({
                'city': 'This field is required.'
            })
        if not location_lat:
            raise ValidationError({
                'location_lat': 'This field is required.'
            })
        if not location_lng:
            raise ValidationError({
                'location_lng': 'This field is required.'
            })
        if type is None:
            raise ValidationError({
                'type': 'This field is required.'
            })
        if len(id) > 100:
            raise ValidationError({
                'id': 'May not be more than 100 characters.'
            })
        if len(name) > 100:
            raise ValidationError({
                'name': 'May not be more than 100 characters.'
            })
        if len(city) > 100:
            raise ValidationError({
                'city': 'May not be more than 100 characters.'
            })

        return {
            'id': id,
            'name': name,
            'city': city,
            'location_lat': location_lat,
            'location_lng': location_lng,
            'type': type
        }