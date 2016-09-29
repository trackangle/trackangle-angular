from rest_framework import serializers
from trackangle.place.models import Place, Comment


class CommentSerializer(serializers.Serializer):

    #id = serializers.IntegerField(required=False)
    text = serializers.CharField(max_length=100)
    place = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    author = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    created = serializers.DateTimeField(required=False)

    class Meta:
        model = Comment
        fields = ('text', 'author', 'place', 'created')
        #fields = ('text')


class PlaceSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    location_lat = serializers.CharField()
    location_lng = serializers.CharField()
    city = serializers.CharField()
    type = serializers.IntegerField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = ('id', 'location_lat', 'location_lng', 'city', 'type', 'comments')



    def get_comments(self, obj):
        comments = []
        if self.context and self.context['request']:
            comments = Comment.objects.filter(place_id=obj.id, author_id=self.context['request'].user.id)
        else:
            comments = Comment.objects.filter(place_id=obj.id)
        if len(comments) != 0:
            serialized = CommentSerializer(comments, many=True)
            return serialized.data
        return []