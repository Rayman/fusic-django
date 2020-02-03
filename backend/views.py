import logging
from operator import itemgetter

import googleapiclient.discovery
import googleapiclient.errors
from django.conf import settings
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import permissions, status, viewsets, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination


from . import youtube
from .models import Playlist, Radio, RadioVote, Song
from .permissions import IsStaffOrReadOnly
from .serializers import (
    PlaylistSerializer,
    RadioSerializer,
    UserSerializer,
    SongSerializer,
)
from .youtube import search

logger = logging.getLogger(__name__)


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RadioViewSet(viewsets.ModelViewSet):
    queryset = Radio.objects.all()
    serializer_class = RadioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = LimitOffsetPagination

    @action(detail=True, methods=["post"])
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

    @action(detail=True, methods=["post"])
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


class SongViewSet(viewsets.GenericViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=["post"])
    def search(self, request, pk=None, **kwargs):
        results = search(request.data["q"])

        # convert to a json
        videos = []
        for item in results["items"]:
            assert item["kind"] == "youtube#searchResult"
            video, created = Song.objects.update_or_create(
                pk=item["id"]["videoId"],
                defaults={"name": item["snippet"]["channelTitle"]},
            )
            videos.append(video)

        serializer = self.get_serializer(videos, many=True)
        return Response(serializer.data)
