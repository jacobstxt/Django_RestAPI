from rest_framework.viewsets import ModelViewSet

from .serializers import TopicSerializer
from .models import Topic

# Create your views here.
class TopicViewSet(ModelViewSet):
    serializer_class = TopicSerializer

    def get_queryset(self):
     return Topic.objects.filter(parent__isnull=True).order_by('priority', 'name')