from flask import (
   Blueprint, jsonify, request
)
from models import db, TransactionsModel
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

@bp.route('/@transactions', methods=["GET"])
def get_transactions():
    transactions = TransactionsModel.query.all()
    return jsonify([transaction.serialize() for transaction in transactions]), 200

@bp.route('/<id>', methods=["GET"])
def get_transaction(id):
    transaction = TransactionsModel.query.get(id)
    if transaction is None:
        return jsonify({"error": "Transaction not found"}), 404
    return jsonify(transaction.serialize()), 200

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