import os
from flask import (
   Blueprint, jsonify, request, session
)
from models import db, UserModel
# from app import create_app


# this creates the auth blueprint
bp = Blueprint('auth', __name__, url_prefix='/auth')


def init_app(bcrypt):

    @bp.route("/<user_id>", methods=["GET"])
    def get_booker(user_id):        
        user = UserModel.query.filter_by(id=user_id).first()
        if user:
            return jsonify(user.serialize()) 
        else: 
            return jsonify({"message": "No user found"}), 404
    
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
        first_name = request.json["firstName"]
        last_name = request.json["lastName"]
        register_code = request.json["registerCode"]
        admin = False

        if not register_code == "eco-cat-reservations-72@L5" and not register_code == "uncle_mikey_lives_forever":
            return jsonify({"error": "incorrect register code"}), 400

        if register_code == "uncle_mikey_lives_forever":
            admin = True
        # if not register_code == os.environ["REGISTER_CODE"] and not register_code == os.environ["ADMIN_CODE"]:
        #     return jsonify({"error": "incorrect register code"}), 400

        # if register_code == os.environ["ADMIN_CODE"]:
        #     admin = True

        user_exists = UserModel.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = UserModel(
            first_name=first_name,
            last_name=last_name,
            email=email, 
            password=hashed_password,
            admin=admin)
        db.session.add(new_user)
        db.session.commit()
        
        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })

    @bp.route("/login", methods=["POST"])
    def login_user():
        print("[DEBUG] does it run?")
        email = request.json["email"]
        password = request.json["password"]

        user = UserModel.query.filter_by(email=email).first()

        if user is None:
            print("[DEBUG] user is none")
            return jsonify({"error": "Unauthorized"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            print("[DEBUG] passwords is wrong")
            return jsonify({"error": "Unauthorized, wrong password"}), 401
        
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
    
    @bp.route("/all-users", methods=["GET"])
    def get_all_user():
        users = UserModel.query.all()
        if not users:
            return jsonify({"error": "No users found"}), 404
        return jsonify([user.serialize() for user in users]), 200 
                
    

