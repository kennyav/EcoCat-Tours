# app/routes/__init__.py

from .user_route_demo import init_user_routes

def init_routes(app):
    init_user_routes(app)
    # You can add more route initializations here for other modules
