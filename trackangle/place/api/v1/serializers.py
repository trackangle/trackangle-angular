from rest_framework import serializers
from trackangle.place.models import Place, Comment, Rating, Budget, City


class CitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=100, required=False)
    name = serializers.CharField(max_length=100)
    location_lat = serializers.CharField(max_length=100)
    location_lng = serializers.CharField(max_length=100)

    class Meta:
        model = City
        fields = ('id', 'name', 'location_lat', 'location_lng')


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
    city = CitySerializer(many=False)
    #routes = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = ('id', 'name', 'location_lat', 'location_lng', 'type', 'comments', 'ratings', 'budgets', 'city', 'route_set')

    def get_comments(self, obj):
        #TODO: multiple/single comment/rating/budget issue must be solved with good practice
        comments = []
        if self.context and 'owner_id' in self.context:
            comments = Comment.objects.filter(place_id=obj.id, author_id=self.context['owner_id'])
        else:
            comments = Comment.objects.filter(place_id=obj.id)
        if len(comments) != 0:
            serialized = CommentSerializer(comments, many=True)
            return serialized.data
        return []

    def get_ratings(self, obj):
        ratings = []
        if self.context and 'owner_id' in self.context:
            ratings = Rating.objects.filter(place_id=obj.id, rater_id=self.context['owner_id'])
        else:
            ratings = Rating.objects.filter(place_id=obj.id)
        if len(ratings) != 0:
            serialized = RatingSerializer(ratings, many=True)
            return serialized.data
        return []

    def get_budgets(self, obj):
        budgets = []
        if self.context and 'owner_id' in self.context:
            budgets = Budget.objects.filter(place_id=obj.id, owner_id=self.context['owner_id'])
        else:
            budgets = Budget.objects.filter(place_id=obj.id)
        if len(budgets) != 0:
            serialized = BudgetSerializer(budgets, many=True)
            return serialized.data
        return []
