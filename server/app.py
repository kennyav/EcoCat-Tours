from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db
from redis import Redis


def create_app():
    # create and configure the app
    app = Flask(__name__)
    app.debug = True    
    app.config['SESSION_COOKIE_NAME'] = '__stripe_mid'
    app.config.from_object(ApplicationConfig)
    redis = Redis(host='redis', port=6379)

    bcrypt = Bcrypt(app)
    server_session = Session(app)


    import auth, salesman, events
    auth.init_app(bcrypt)
    app.register_blueprint(auth.bp)
    app.register_blueprint(salesman.bp)
    app.register_blueprint(events.bp)

    
   
    CORS(app, supports_credentials=True)
    db.init_app(app)
    with app.app_context():
        db.create_all()

    @app.route('/')
    def index():
        redis.incr('hits')
        return 'This page has been visited {} times.'.format(redis.get('hits'))
    return app


