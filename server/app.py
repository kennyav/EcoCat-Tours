from flask import Flask, abort, jsonify, request
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, UserModel
from redis import Redis



app = Flask(__name__)
redis = Redis(host='redis', port=6379)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)
with app.app_context():
   db.create_all()

# this is for redis
@app.route('/')
def index():
    redis.incr('hits')
    return 'This page has been visited {} times.'.format(redis.get('hits'))

@app.route("/register", methods=["POST"])
def register_user():
   email = request.json["email"]
   password = request.json["password"]

   user_exists = UserModel.query.filter_by(email=email).first() is not None

   if user_exists:
      return jsonify({"error": "User already exists"}), 409

   hashed_password = bcrypt.generate_password_hash(password)
   new_user = UserModel(email=email, password=hashed_password)
   db.session.add(new_user)
   db.session.commit()

   return jsonify({
      "id": new_user.id,
      "email": new_user.email
   })


@app.route("/login", methods=["POST"])
def login_user():
   email = request.json["email"]
   password = request.json["password"]

   user = UserModel.query.filter_by(email=email).first()

   if user is None:
      return jsonify({"error": "Unauthorized User Null"}), 401
   
   if not bcrypt.check_password_hash(user.password, password):
      return jsonify({"error": "Unauthorized"}), 401
   
   return jsonify({
      "id": user.id,
      "email": user.email
   })
if __name__ == "__main__":
   app.run(debug=True)