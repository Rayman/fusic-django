from django.conf.urls import url
from django.urls import include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"playlists", views.PlaylistViewSet)
router.register(r"radios", views.RadioViewSet)


urlpatterns = router.urls
urlpatterns += [
    url(r"^api-auth/", include("rest_framework.urls")),
]
