from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, UserModel, SalesmenModel

app = Flask(__name__)
app.debug = True
app.config['SESSION_COOKIE_NAME'] = '__stripe_mid'
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = UserModel.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

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
    
    session["user_id"] = new_user.id

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
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    # chrome issue 
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route('/register-salesmen', methods=["POST"])
def upload_salesmen():
    # first, last, email, phone, notes
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    email = request.json["email"]
    phone = request.json["phoneNumber"]
    notes = request.json["notes"]

    new_salesmen = SalesmenModel(first_name=first_name, last_name=last_name, email=email, phone=phone, notes=notes)
    db.session.add(new_salesmen)
    db.session.commit()
    
    return jsonify({
        "id": new_salesmen.id,
        "first_name": new_salesmen.first_name,
        "last_name": new_salesmen.last_name,
        "email": new_salesmen.email,
        "phone": new_salesmen.phone,
        "notes": new_salesmen.notes,
        "date": new_salesmen.created_at,
    })

@app.route("/@salesmen", methods=["GET"])
def get_all_salesmen():
    salesmen = SalesmenModel.query.all()
    salesmen_list = []
    
    for salesman in salesmen:
        salesmen_list.append({
            "id": salesman.id,
            "first_name": salesman.first_name,
            "last_name": salesman.last_name,
            "email": salesman.email,
            "phone": salesman.phone,
            "notes": salesman.notes,
            "date": salesman.created_at
        })
    return jsonify(salesmen_list)

@app.route("/edit-salesmen/<salesmen_id>", methods=["PUT"])
def edit_salesmen(salesmen_id):
    salesmen = SalesmenModel.query.get(salesmen_id)

    if not salesmen:
        return jsonify({"error": "Salesmen not found"}), 404
    
    # Update the salesmen information based on the request data
    if 'firstName' in request.json:
        salesmen.first_name = request.json['firstName']
    if 'lastName' in request.json:
        salesmen.last_name = request.json['lastName']
    if 'email' in request.json:
        salesmen.email = request.json['email']
    if 'phone' in request.json:
        salesmen.phone = request.json['phone']
    if 'notes' in request.json:
        salesmen.notes = request.json['notes']

    db.session.commit()

    return jsonify({
        "message": "Salesmen updated successfully",
        "id": salesmen.id,
        "first_name": salesmen.first_name,
        "last_name": salesmen.last_name,
        "email": salesmen.email,
        "phone": salesmen.phone,
        "notes": salesmen.notes,
        "date": salesmen.created_at
    })

if __name__ == "__main__":
    app.run(debug=True)