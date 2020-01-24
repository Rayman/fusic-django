from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from .permissions import IsStaffOrReadOnly
from .models import Playlist, Radio, RadioVote
from .serializers import PlaylistSerializer, UserSerializer, RadioSerializer


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RadioViewSet(viewsets.ModelViewSet):
    queryset = Radio.objects.all()
    serializer_class = RadioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @detail_route(methods=["post"])
    def upvote(self, request, pk=None, **kwargs):
        radio = self.get_object()
        if "song_id" not in request.data:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        try:
            radio.votes.create(
                owner_id=request.user.id, song_id=request.data["song_id"]
            )
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(None, status=status.HTTP_201_CREATED)

    @detail_route(methods=["post"])
    def downvote(self, request, pk=None, **kwargs):
        radio = self.get_object()
        if "song_id" not in request.data:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        try:
            radio.votes.get(
                owner_id=request.user.id, song_id=request.data["song_id"]
            ).delete()
        except RadioVote.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsStaffOrReadOnly]
