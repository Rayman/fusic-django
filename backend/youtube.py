import logging

import requests
from django.conf import settings
from rest_framework.exceptions import APIException

logger = logging.getLogger(__name__)


class YoutubeServiceUnavailable(APIException):
    status_code = 503
    default_detail = "Youtube API service temporarily unavailable, try again later."
    default_code = "service_unavailable"


def search(q):
    logger.info("youtube q=%r", q)
    params = {
        "key": settings.YOUTUBE_API_KEY,
        "q": q,
        "part": "snippet",
        "type": "video",
    }
    try:
        r = requests.get("https://www.googleapis.com/youtube/v3/search", params=params)
        return r.json()
    except requests.exceptions.RequestException as e:
        raise YoutubeServiceUnavailable() from e
