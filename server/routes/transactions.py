from datetime import datetime
from flask import (Blueprint, jsonify, request)
from sqlalchemy import func
from models import db, TransactionsModel, PassengersModel
import json

bp = Blueprint('transactions', __name__, url_prefix='/transactions')

@bp.route('/create-transaction', methods=["POST"])
def create_transaction():
    data = request.get_json()
    passenger_id = data.get("passengerId")
    

    new_transaction = TransactionsModel(passenger_id=passenger_id)
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify(new_transaction.serialize()), 200


@bp.route('/get-transactions/<month>/<day>/<year>', methods=["GET"])
def get_transactions(month, day, year):
    try:
        date_string = f"{year}-{month}-{day}"  # Construct the date string
        search_date = datetime.strptime(date_string, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Please provide the date in 'MM-DD-YYYY' format."}), 400

    # Filter transactions based on the date part of the created_at column
    transactions = TransactionsModel.query.filter(func.date(TransactionsModel.created_at) == search_date).all()

    # Check if any transactions are found for the provided date
    if not transactions:
        return jsonify({"error": "No transactions found for the provided date"}), 404
   
    passengers = []
    for transaction in transactions:
        passenger = PassengersModel.query.filter_by(id=transaction.passenger_id).first()  # Retrieve the passenger object
        if passenger:
            passengers.append(passenger)

    # Serialize the passengers and return them
    serialized_passengers = [passenger.serialize() for passenger in passengers]
    return jsonify(serialized_passengers), 200

@bp.route('/<id>', methods=["PUT"])
def update_transaction(id):
    transaction = TransactionsModel.query.get(id)
    if transaction is None:
        return jsonify({"error": "Transaction not found"}), 404

    data = request.get_json()
    transaction.customer_name = data.get('passenger_ids', transaction.customer_name)

    db.session.commit()
    return jsonify(transaction.serialize()), 200

@bp.route('/<id>', methods=["DELETE"])
def delete_transaction(id):
    transaction = TransactionsModel.query.get(id)
    if transaction is None:
        return jsonify({"error": "Transaction not found"}), 404

    db.session.delete(transaction)
    db.session.commit()
    return jsonify({"message": "Transaction deleted"}), 200