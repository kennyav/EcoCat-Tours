from flask import (
   Blueprint, jsonify, request, session
)
from models import db, UserModel
# from app import create_app


# this creates the auth blueprint
bp = Blueprint('auth', __name__, url_prefix='/auth')
# bcrypt = Bcrypt(create_app())
# server_session = Session(create_app())

def init_app(bcrypt):
    @bp.route("/@me", methods=["GET"])
    def get_current_user():
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401
        
        user = UserModel.query.filter_by(id=user_id).first()
        return jsonify({
            "id": user.id,
            "email": user.email
        }) 

    @bp.route("/register", methods=["POST"])
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
        
        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })

    @bp.route("/login", methods=["POST"])
    def login_user():
        email = request.json["email"]
        password = request.json["password"]

        user = UserModel.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Unauthorized"}), 401
        
        # chrome issue 
        session["user_id"] = user.id

        return jsonify({
            "id": user.id,
            "email": user.email
        })

    @bp.route("/logout", methods=["POST"])
    def logout_user():
        session.pop("user_id")
        return "200"
    

