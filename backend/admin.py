from django.contrib import admin
from .models import Playlist, Song, PlaylistEntry, RadioVote, Radio

admin.site.register(Song)


class PlaylistEntryInline(admin.TabularInline):
    model = PlaylistEntry
    # extra = 3


class PlaylistAdmin(admin.ModelAdmin):
    inlines = [PlaylistEntryInline]
    list_display = ("name", "created_date", "modified_date")


admin.site.register(Playlist, PlaylistAdmin)


class RadioVoteInline(admin.TabularInline):
    model = RadioVote
    # extra = 3


class RadioAdmin(admin.ModelAdmin):
    inlines = [RadioVoteInline]
    list_display = ("name", "created_date", "modified_date")


admin.site.register(Radio, RadioAdmin)
