from django.contrib import admin

from .models import Playlist, PlaylistEntry, Radio, RadioVote, Song

admin.site.register(Song)


class PlaylistEntryInline(admin.TabularInline):
    model = PlaylistEntry
    # extra = 3


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    inlines = [PlaylistEntryInline]
    list_display = ("name", "created_date", "modified_date")


class RadioVoteInline(admin.TabularInline):
    model = RadioVote
    # extra = 3


@admin.register(Radio)
class RadioAdmin(admin.ModelAdmin):
    inlines = [RadioVoteInline]
    list_display = ("name", "created_date", "modified_date")
