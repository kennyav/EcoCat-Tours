from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db

def create_app():
    # create and configure the app
    app = Flask(__name__)
    app.debug = True    
    #app.config['SESSION_COOKIE_NAME'] = '__stripe_mid'
    app.config.from_object(ApplicationConfig)

    bcrypt = Bcrypt(app)
    server_session = Session(app)


    import routes.auth as auth, routes.salesman as salesman, routes.events as events, routes.bookings as bookings
    auth.init_app(bcrypt)
    app.register_blueprint(auth.bp)
    app.register_blueprint(salesman.bp)
    app.register_blueprint(events.bp)
    app.register_blueprint(bookings.bp)
    
    CORS(app, supports_credentials=True)
    db.init_app(app)
    with app.app_context():
        #db.drop_all()
        db.create_all()
    
    return app


