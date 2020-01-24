from django.conf import settings
from django.db import models


class Song(models.Model):
    name = models.CharField(max_length=100)

    created_date = models.DateTimeField("created at", auto_now_add=True)
    modified_date = models.DateTimeField("modified at", auto_now=True)

    def __str__(self):
        return self.name


class Playlist(models.Model):
    name = models.CharField(max_length=100)
    cover_url = models.URLField(blank=True)
    # owner?

    created_date = models.DateTimeField("created at", auto_now_add=True)
    modified_date = models.DateTimeField("modified at", auto_now=True)

    songs = models.ManyToManyField(Song, through="PlaylistEntry")

    def __str__(self):
        return self.name


class PlaylistEntry(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    created_date = models.DateTimeField(auto_now_add=True)


class Radio(models.Model):
    name = models.CharField(max_length=100)
    cover_url = models.URLField(blank=True)
    # owner?

    created_date = models.DateTimeField("created at", auto_now_add=True)
    modified_date = models.DateTimeField("modified at", auto_now=True)

    songs = models.ManyToManyField(Song, through="RadioVote")

    def __str__(self):
        return self.name


class RadioVote(models.Model):
    radio = models.ForeignKey(Radio, related_name="votes", on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("radio", "song", "owner")
