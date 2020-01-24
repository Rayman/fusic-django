import logging

from channels import Group
from channels.binding.base import CREATE
from channels.binding.websockets import WebsocketBinding
from channels.generic.websockets import WebsocketDemultiplexer

from .models import Radio, RadioVote
from .serializers import RadioVoteSerializer, RadioSerializer

logger = logging.getLogger(__name__)


class RadioBinding(WebsocketBinding):
    model = Radio
    fields = []
    stream = "radios"

    @classmethod
    def group_names(cls, instance):
        return ["radios-%s" % instance.pk]

    def run_action(self, action, pk, data):
        """
        Performs the requested action
        """
        # Check to see if we're allowed
        if self.has_permission(self.user, action, pk):
            if action == "sub":
                self.sub(pk)
            elif action == "unsub":
                self.unsub(pk)
            else:
                raise ValueError("Bad action %r" % action)

    def has_permission(self, user, action, pk):
        return True

    def sub(self, pk):
        logger.info("sub: %s", pk)
        payload = self.serialize(self.model.objects.get(pk=pk), CREATE)
        self.kwargs["multiplexer"].send(payload)
        Group("radios-%s" % pk, channel_layer=self.message.channel_layer).add(
            self.message.reply_channel
        )

    def unsub(self, pk):
        logger.info("unsub: %s", pk)
        Group("radios-%s" % pk, channel_layer=self.message.channel_layer).discard(
            self.message.reply_channel
        )

    def serialize_data(self, instance):
        return RadioSerializer(instance).data


class VoteBinding(WebsocketBinding):
    model = RadioVote
    fields = []
    stream = "radios"

    @classmethod
    def group_names(cls, instance):
        group = "radios-%d" % instance.radio.pk
        logger.info("update on group: %s", group)
        return [group]

    def serialize_data(self, instance):
        return RadioVoteSerializer(instance).data


class Demultiplexer(WebsocketDemultiplexer):
    consumers = {
        "radios": RadioBinding.consumer,
    }
