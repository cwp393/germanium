from SimpleHTTPServer import SimpleHTTPRequestHandler
from SocketServer import TCPServer
from threading import Thread

from behave import *

def before_all(context):
    TCPServer.allow_reuse_address = True
    Handler = SimpleHTTPRequestHandler
    context._httpServer = TCPServer(("localhost", 8000), Handler)

    t = Thread(target=context._httpServer.serve_forever)
    t.start()

def after_all(context):
    context._httpServer.shutdown()

def after_scenario(context, scenario):
    context.germanium.quit()

