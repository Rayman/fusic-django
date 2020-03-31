from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/", include("backend.urls")),
    path("api/auth/", include("rest_auth.urls")),
    path("admin/", admin.site.urls),
]
