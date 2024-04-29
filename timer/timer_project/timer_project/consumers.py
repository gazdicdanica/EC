import json
from channels.generic.websocket import WebsocketConsumer

class MessageConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Emituj poruku svim klijentima
        self.send_message(json.dumps({
            'message': message
        }))

    def send_message(self, message):
        # Šalje poruku nazad klijentu
        self.send(message)