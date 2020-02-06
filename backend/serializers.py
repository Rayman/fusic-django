from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Playlist, Radio, RadioVote, Song


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ("id", "name", "thumbnail")


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ("id", "name", "cover_url", "created_date", "modified_date")


class RadioVoteSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = RadioVote
        fields = ("id", "owner", "song", "radio")


class RadioSerializer(serializers.ModelSerializer):
    votes = RadioVoteSerializer(many=True, read_only=True)
    songs = SongSerializer(many=True, read_only=True)

    def to_representation(self, instance):
        data = super(RadioSerializer, self).to_representation(instance)

        votes = data.pop("votes")
        for song in data["songs"]:
            song["votes"] = [vote for vote in votes if vote["song"] == song["id"]]

        return data

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


class RadioListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radio
        fields = (
            "id",
            "name",
            "cover_url",
            "created_date",
            "modified_date",
            "songs",
        )
