# U routing.py

from django.urls import path
from .consumers import MessageConsumer

websocket_urlpatterns = [
    path('ws/message/', MessageConsumer.as_asgi()),
]
