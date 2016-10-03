from rest_framework import serializers
from trackangle.place.models import Place, Comment, Rating, Budget


class CommentSerializer(serializers.ModelSerializer):

    text = serializers.CharField(max_length=100)
    place = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    author = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    created = serializers.DateTimeField(required=False)

    class Meta:
        model = Comment
        fields = ('text', 'author', 'place', 'created')


class RatingSerializer(serializers.ModelSerializer):

    rate = serializers.IntegerField()
    place = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    rater = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    class Meta:
        model = Rating
        fields = ('rate', 'rater', 'place')


class BudgetSerializer(serializers.ModelSerializer):

    budget = serializers.IntegerField()
    place = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    class Meta:
        model = Budget
        fields = ('budget', 'owner', 'place')


class PlaceSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    location_lat = serializers.CharField()
    location_lng = serializers.CharField()
    city = serializers.CharField()
    type = serializers.IntegerField()
    comments = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()
    budgets = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = ('id', 'location_lat', 'location_lng', 'city', 'type', 'comments', 'ratings', 'budgets')

    def get_comments(self, obj):
        #TODO: multiple/single comment/rating/budget issue must be solved with good practice
        comments = []
        if self.context and self.context['request']:
            comments = Comment.objects.filter(place_id=obj.id, author_id=self.context['request'].user.id)
        else:
            comments = Comment.objects.filter(place_id=obj.id)
        if len(comments) != 0:
            serialized = CommentSerializer(comments, many=True)
            return serialized.data
        return []

    def get_ratings(self, obj):
        ratings = []
        if self.context and self.context['request']:
            ratings = Rating.objects.filter(place_id=obj.id, rater_id=self.context['request'].user.id)
        else:
            ratings = Rating.objects.filter(place_id=obj.id)
        if len(ratings) != 0:
            serialized = RatingSerializer(ratings, many=True)
            return serialized.data
        return []

    def get_budgets(self, obj):
        budgets = []
        if self.context and self.context['request']:
            budgets = Budget.objects.filter(place_id=obj.id, owner_id=self.context['request'].user.id)
        else:
            budgets = Budget.objects.filter(place_id=obj.id)
        if len(budgets) != 0:
            serialized = BudgetSerializer(budgets, many=True)
            return serialized.data
        return []