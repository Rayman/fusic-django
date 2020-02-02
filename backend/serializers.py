from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Playlist, Radio, RadioVote, Song


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "url", "username", "email", "groups")


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ("id", "name")


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ("id", "name", "cover_url", "created_date", "modified_date")


class RadioVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadioVote
        fields = ("id", "owner", "song", "radio")


class RadioSerializer(serializers.ModelSerializer):
    votes = RadioVoteSerializer(many=True, read_only=True)
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Radio
        fields = (
            "id",
            "name",
            "cover_url",
            "created_date",
            "modified_date",
            "songs",
            "votes",
        )
