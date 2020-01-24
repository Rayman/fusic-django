from channels.routing import include

channel_routing = [include("backend.routing.channel_routing", path=r"^/api")]
