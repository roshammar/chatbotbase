import json
from flask import Flask
from flask_sockets import Sockets

import model


app = Flask(__name__)
sockets = Sockets(app)


@sockets.route('/chat')
def echo_socket(ws):
    while not ws.closed:
        message = json.loads(ws.receive())
        message['msg'] = model.chat(message['msg'])
        message['author'] = 'you'
        ws.send(json.dumps(message))


if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    server.serve_forever()
