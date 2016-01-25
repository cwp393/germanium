from SimpleHTTPServer import SimpleHTTPRequestHandler
from SocketServer import TCPServer
from threading import Thread
import os

from behave import *

def before_all(context):
    TCPServer.allow_reuse_address = True
    Handler = SimpleHTTPRequestHandler
    context._httpServer = TCPServer(("localhost", 8000), Handler)

    print("started server on localhost:8000")

    t = Thread(target=context._httpServer.serve_forever)
    t.start()

def after_all(context):
    context._httpServer.shutdown()

    reuse_browser = 'TEST_REUSE_BROWSER' in os.environ.keys()

def after_scenario(context, scenario):
    keep_browser = 'TEST_KEEP_BROWSER' in os.environ.keys()
    reuse_browser = 'TEST_REUSE_BROWSER' in os.environ.keys()

    if keep_browser:
        print("Not closing the browser since TEST_KEEP_BROWSER is set")
    elif reuse_browser:
        print("Not closing the browser since TEST_REUSE_BROWSER is set")
    else:
        if 'germanium' in context and context.germanium:
            context.germanium.quit()
        else:
            print("Germanium is not running in the current test context")

