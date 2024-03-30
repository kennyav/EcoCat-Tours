from flask import (
   Blueprint, jsonify, request
)
from datetime import datetime
from models import db, PassengersModel

# this creates the auth blueprint
bp = Blueprint('bookings', __name__, url_prefix='/bookings')

@bp.route('/create-booking', methods=["POST"])
def create_booking():
    data = request.json
    year = data.get('year')
    month = data.get('month')
    day = data.get('day')
    start_time = data.get('startTime')
    event_id = data.get('eventId')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    phone = data.get('phoneNumber')
    notes = data.get('notes')
    payment_type = data.get('paymentSource')
    payment_status = data.get('paymentStatus')
    commission_received = data.get('commissionReceived')
    booker_id = data.get('bookerId')
    adult_passengers = data.get('adultNumber')
    children_passengers = data.get('childrenNumber')
    infant_passengers = data.get('infantNumber')
    adult_price = data.get('adultPrice')
    children_price = data.get('childrenPrice')
    infant_price = data.get('infantPrice')
    food = data.get('foodOptions')
    t_shirt = data.get('shirts')
    total_price = data.get('totalPrice')
    checked_in = False

    # Create a new passenger booking in the database
    new_passenger_booking = PassengersModel(
        event_id=event_id,
        year=year,
        month=month,
        day=day,
        start_time=start_time,
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        notes=notes,
        payment_type=payment_type,
        payment_status=payment_status,
        commission_received=commission_received,
        checked_in=checked_in,
        booker_id=booker_id,
        adult_passengers=adult_passengers,
        children_passengers=children_passengers,
        infant_passengers=infant_passengers,
        adult_price=adult_price,
        children_price=children_price,
        infant_price=infant_price,
        food=food,
        t_shirt=t_shirt,
        total_price=total_price
    )

    db.session.add(new_passenger_booking)
    db.session.commit()

    return jsonify(new_passenger_booking.serialize()), 200



@bp.route('/<event_id>/<year>/<month>/<day>/<start_time>', methods=["GET"])
def get_passengers(event_id, year, month, day, start_time):
    selected_passengers = PassengersModel.query.filter_by(
        event_id = event_id,
        year = year,
        month = month,
        day = day,
        start_time = start_time
        ).all()
    
    print(selected_passengers)
    if selected_passengers:
        return jsonify([passenger.serialize() for passenger in selected_passengers]), 200
    else:
        return jsonify({"message": "No passengers found for the specified event and time"}), 404

@bp.route("/delete/<passenger_id>", methods=["DELETE"])
def delete_passenger(passenger_id):
    passenger = PassengersModel.query.get(passenger_id)

    if not passenger:
        return jsonify({"error": "Event not found"}), 404

    db.session.delete(passenger)
    db.session.commit()

    return jsonify({"message": "Passenger deleted successfully"})
    
@bp.route("/update-checkedin/<passenger_id>", methods=["PUT"])
def update_checkedin(passenger_id):
    passenger = PassengersModel.query.get(passenger_id)
    if not passenger:
        return jsonify({"error": "Event not found"}), 404
    if 'checkedIn' in request.json:
        passenger.checked_in = request.json['checkedIn']
    
    db.session.commit()

    return jsonify({"message": "Checkin updated successfully",
                    "checked_in": passenger.checked_in
                    }), 200

@bp.route("/edit-passenger/<passenger_id>", methods=["PUT"])
def update_passenger(passenger_id):
    passenger = PassengersModel.query.get(passenger_id)
    if not passenger:
        return jsonify({"error": "Event not found"}), 404
    

    if 'firstName' in request.json:
        passenger.first_name = request.json['firstName']
    if 'lastName' in request.json:
        passenger.last_name = request.json['lastName']
    if 'email' in request.json:
        passenger.email = request.json['email']
    if 'phoneNumber' in request.json:
        passenger.phone = request.json['phoneNumber']
    if 'notes' in request.json:
        passenger.notes = request.json['notes']
    if 'adultNumber' in request.json:
        passenger.adult_passengers = request.json['adultNumber']
    if 'childrenNumber' in request.json:
        passenger.children_passengers = request.json['childrenNumber']
    if 'infantNumber' in request.json:
        passenger.infant_passengers = request.json['infantNumber']
    if 'adultPrice' in request.json:
        passenger.adult_price = request.json['adultPrice']
    if 'childrenPrice' in request.json:
        passenger.children_price = request.json['childrenPrice']
    if 'infantPrice' in request.json:
        passenger.infant_price = request.json['infantPrice']
    
    db.session.commit()

    return jsonify({"message": "Passenger updated successfully" }), 200
