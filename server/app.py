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
    app.config['SESSION_COOKIE_NAME'] = '__stripe_mid'
    app.config.from_object(ApplicationConfig)

    bcrypt = Bcrypt(app)
    server_session = Session(app)

    # if test_config is None:
    #     # load the instance config, if it exists, when not testing
    #     app.config.from_pyfile('config.py', silent=True)
    # else:
    #     # load the test config if passed in
    #     app.config.from_mapping(test_config)

    import auth, salesman
    auth.init_app(bcrypt)
    app.register_blueprint(auth.bp, name="auth_blueprint")
    app.register_blueprint(salesman.bp)

    
   
    CORS(app, supports_credentials=True)
    db.init_app(app)
    with app.app_context():
        db.create_all()
    
    return app





# if __name__ == "__main__":
#     app.run(debug=True)