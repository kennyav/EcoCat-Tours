from flask import (
    Blueprint, jsonify, request, session
)
from datetime import datetime
from models import db, PassengersModel, SalesmenModel, EventHistory, UserModel, EventsScheduleModel

# this creates the auth blueprint
bp = Blueprint('bookings', __name__, url_prefix='/bookings')


def update_history(data):
    history = EventHistory.query.filter_by(
        scheduled_event_id=data.scheduled_event_id).first()
    salesman = SalesmenModel.query.filter_by(id=data.salesman_id).first()

    booking_text = f"?{datetime.now().date()}: {salesman.first_name} {salesman.last_name} booked {data.adult_passengers} adults/{data.adult_price}$, {data.children_passengers} children/{data.children_price}$, and {data.infant_passengers} Infants/{
        data.infant_price}$. Payment Status - {data.payment_status}, Commission Received - {data.commission_received}, Payment Type - {data.payment_type}. If Partial Payment, amount paid = {data.partial_payment}"

    if booking_text:
        history.new_booking = history.new_booking + booking_text

    db.session.commit()


def update_history_check_in(data):
    user_id = session.get("user_id")
    history = EventHistory.query.filter_by(
        scheduled_event_id=data.scheduled_event_id).first()

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = UserModel.query.filter_by(id=user_id).first()
    checkin_text = f"?{datetime.now().date()}: {user.first_name} checked in {
        data.first_name} {data.last_name}'s party"

    if checkin_text:
        history.new_booking = history.new_booking + checkin_text

    db.session.commit()


def update_history_edit_passenger(data):
    user_id = session.get("user_id")
    history = EventHistory.query.filter_by(
        scheduled_event_id=data.scheduled_event_id).first()

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = UserModel.query.filter_by(id=user_id).first()
    passenger_text = f"?{datetime.now().date()}: {user.first_name} edited {
        data.first_name} {data.last_name}'s party"

    if passenger_text:
        history.passenger_edit = history.passenger_edit + passenger_text

    db.session.commit()


@bp.route('/create-booking', methods=["POST"])
def create_booking():
    data = request.json
    scheduled_event_id = data.get('scheduledEventId')
    salesman_id = data.get('salesmanId')
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
    partial_payment = data.get("partialPayment")
    total_price = data.get('totalPrice')
    checked_in = False

    # Create a new passenger booking in the database
    new_passenger_booking = PassengersModel(
        scheduled_event_id=scheduled_event_id,
        salesman_id=salesman_id,
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        notes=notes,
        payment_type=payment_type,
        payment_status=payment_status,
        partial_payment=partial_payment,
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
    update_history(new_passenger_booking)

    return jsonify(new_passenger_booking.serialize()), 200


@bp.route('/<scheduled_event_id>', methods=["GET"])
def get_passengers(scheduled_event_id):
    selected_passengers = PassengersModel.query.filter_by(
        scheduled_event_id=scheduled_event_id).all()

    if selected_passengers:
        return jsonify([passenger.serialize() for passenger in selected_passengers]), 200
    else:
        return jsonify({"message": "No passengers found for the specified event and time"}), 404
    
@bp.route('/get_passenger/<passenger_id>', methods=["GET"])
def get_passenger(passenger_id):
    selected_passenger = PassengersModel.query.filter_by(
        id=passenger_id).first()

    if selected_passenger:
        return jsonify(selected_passenger.serialize()), 200
    else:
        return jsonify({"message": "No passengers found for the specified event and time"}), 404



@bp.route("/delete/<passenger_id>", methods=["DELETE"])
def delete_passenger(passenger_id):
    passenger = PassengersModel.query.get(passenger_id)

    if not passenger:
        return jsonify({"error": "Event not found"}), 404

    # Fetch the scheduled event linked to the passenger
    scheduled_event = EventsScheduleModel.query.filter_by(
        id=passenger.scheduled_event_id).first()

    if not scheduled_event:
        return jsonify({'error': 'Scheduled event not found'}), 404
    
    adult = max(0, scheduled_event.curr_adult - passenger.adult_passengers)
    children = max(0, scheduled_event.curr_children - passenger.children_passengers)
    infant = max(0, scheduled_event.curr_infant - passenger.infant_passengers)
    capacity = scheduled_event.capacity + passenger.adult_passengers + passenger.children_passengers + passenger.infant_passengers
    # Subtract passenger counts from the event
    scheduled_event.curr_adult = adult
    scheduled_event.curr_children = children
    scheduled_event.curr_infant = infant
    scheduled_event.capacity = capacity

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
    update_history_check_in(passenger)

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
    if 'paymentSource' in request.json:
        passenger.payment_source = request.json['paymentSource']
    if 'paymentStatus' in request.json:
        passenger.payment_status = request.json['paymentStatus']
    if 'partialPayment' in request.json:
        passenger.partial_payment = request.json['partialPayment']
    if 'commissionReceived' in request.json:
        passenger.commission_received = request.json['commissionReceived']
    if 'totalPrice' in request.json:
        passenger.total_price = request.json['totalPrice']

    db.session.commit()
    update_history_edit_passenger(passenger)

    return jsonify({"message": "Passenger updated successfully"}), 200
