from flask import (
   Blueprint, jsonify, request
)
from models import db, SalesmenModel, PassengersModel, TransactionsModel


# this creates the auth blueprint
bp = Blueprint('salesmen', __name__, url_prefix='/salesmen')

@bp.route('/register-salesmen', methods=["POST"])
def upload_salesmen():
    # first, last, email, phone, notes
    email = ''
    phone = ''
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    if 'email' in request.json:
        email = request.json["email"]
    if 'phone' in request.json:
        phone = request.json["phoneNumber"]
    notes = request.json["notes"]

    new_salesmen = SalesmenModel(first_name=first_name, last_name=last_name, email=email, phone=phone, notes=notes)
    db.session.add(new_salesmen)
    db.session.commit()
    
    return jsonify(new_salesmen.serialize())


@bp.route("/delete/<salesman_id>", methods=["DELETE"])
def delete_salesman(salesman_id):
    salesman = SalesmenModel.query.get(salesman_id)

    if not salesman:
        return jsonify({"error": "Salesman not found"}), 404

    db.session.delete(salesman)
    db.session.commit()

    return jsonify({"message": "Salesmen deleted successfully"})

@bp.route("/@salesmen", methods=["GET"])
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

@bp.route("/<salesman_id>", methods=["GET"])
def get_salesman(salesman_id):
    salesman = SalesmenModel.query.get(salesman_id)
    if not salesman:
        return jsonify({"error": "salesman does not exist"}), 404
    return jsonify(salesman.serialize())

@bp.route("/edit-salesmen/<salesmen_id>", methods=["PUT"])
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

@bp.route('transactions/<salesman_id>', methods=["GET"])
def get_transactions_by_salesman(salesman_id):
    # Retrieve passengers associated with the salesman
    passengers = PassengersModel.query.filter_by(salesman_id=salesman_id).all()

    # Extract passenger IDs
    passenger_ids = [passenger.id for passenger in passengers]

    # Retrieve transactions associated with the passenger IDs
    transactions = TransactionsModel.query.filter(TransactionsModel.passenger_id.in_(passenger_ids)).all()

    # Serialize transactions
    transactions_list = [transaction.serialize() for transaction in transactions]

    return jsonify(transactions_list), 200
