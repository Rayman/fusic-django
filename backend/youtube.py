import googleapiclient.discovery
import googleapiclient.errors
from django.conf import settings

api_service_name = "youtube"
api_version = "v3"

youtube = googleapiclient.discovery.build(
    api_service_name,
    api_version,
    developerKey=settings.YOUTUBE_API_KEY,
    cache_discovery=False,
)


def search(q):
    request = youtube.search().list(part="snippet", q="the doors", type="video")
    return request.execute()
