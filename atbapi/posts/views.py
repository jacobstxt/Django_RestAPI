from rest_framework.viewsets import ModelViewSet

from posts.models import Post
from posts.serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]
    # ordering_fields = ['id', 'name']