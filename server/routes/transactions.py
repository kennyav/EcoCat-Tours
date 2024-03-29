from flask import (
   Blueprint, jsonify, request
)
from models import db, TransactionsModel

bp = Blueprint('transactions', __name__, url_prefix='/transactions')

@bp.route('/create-transaction', methods=["POST"])
def create_transaction():
    customer_name = request.json["customerName"]
    transaction_time = request.json["transactionTime"]
    amount = request.json["amount"]
    event_type = request.json["eventType"]
    event_details = request.json["eventDetails"]
    recipient = request.json["recipient"]

    new_transaction = TransactionsModel(customer_name=customer_name, transaction_time=transaction_time, amount=amount, event_type=event_type, event_details=event_details, recipient=recipient)
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({
        "id": new_transaction.id,
        "customer_name": new_transaction.customer_name,
        "transaction_time": new_transaction.transaction_time,
        "amount": new_transaction.amount,
        "event_type": new_transaction.event_type,
        "event_details": new_transaction.event_details,
        "recipient": new_transaction.recipient,
        "created_at": new_transaction.created_at,
    }), 201

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
    transaction.customer_name = data.get('customer_name', transaction.customer_name)
    transaction.transaction_time = data.get('transaction_time', transaction.transaction_time)
    transaction.amount = data.get('amount', transaction.amount)
    transaction.event_type = data.get('event_type', transaction.event_type)
    transaction.event_details = data.get('event_details', transaction.event_details)
    transaction.recipient = data.get('recipient', transaction.recipient)

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