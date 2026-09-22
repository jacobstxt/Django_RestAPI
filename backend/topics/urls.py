from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TopicViewSet

router = DefaultRouter()
router.register(r'topics', TopicViewSet)

urlpatterns = [
    path('', include(router.urls)),
]