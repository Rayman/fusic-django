import googleapiclient.discovery
import googleapiclient.errors
from django.conf import settings
from httplib2 import ServerNotFoundError
from rest_framework.exceptions import APIException


class YoutubeServiceUnavailable(APIException):
    status_code = 503
    default_detail = "Youtube API service temporarily unavailable, try again later."
    default_code = "service_unavailable"


youtube = googleapiclient.discovery.build(
    "youtube", "v3", developerKey=settings.YOUTUBE_API_KEY, cache_discovery=False,
)


def search(q):
    request = youtube.search().list(part="snippet", q="the doors", type="video")
    try:
        return request.execute()
    except ServerNotFoundError as e:
        raise YoutubeServiceUnavailable() from e
