from datetime import datetime
from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class UserModel(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    admin = db.Column(db.Boolean)
    created_at = db.Column(DateTime, default=datetime.now)

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'admin': self.admin,
            'created_at': self.created_at

        }

class SalesmenModel(db.Model):
    __tablename__ = "salesmen"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(345))
    phone = db.Column(db.String(20))
    notes = db.Column(db.Text)
    created_at = db.Column(DateTime, default=datetime.now)
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'notes': self.notes,
            'created_at': self.created_at

        }

class EventsModel(db.Model):
    __tablename__ = "events"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text)
    capacity = db.Column(db.Integer, nullable=False)
    above_drinking_age = db.Column(db.Boolean)
    created_by = db.Column(db.String(32))
    created_at = db.Column(DateTime, default=datetime.now)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'capacity': self.capacity,
            'above_drinking_age': self.above_drinking_age,
            'created_by': self.created_by,
            'created_at': self.created_at
        }
        
class EventsScheduleModel(db.Model):
    __tablename__ = "event_schedule"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    event_id = db.Column(db.String(32))
    start_time = db.Column(DateTime) # this should include year, month, day, and hour
    end_time = db.Column(DateTime)
    adult_passengers = db.Column(db.Integer)
    capacity = db.Column(db.Integer, nullable=False)
    children_passengers = db.Column(db.Integer)
    infant_passengers = db.Column(db.Integer)
    days = db.Column(db.String(7))
    created_at = db.Column(DateTime, default=datetime.now)

    def serialize(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'adult_passengers': self.adult_passengers,
            'children_passengers': self.children_passengers,
            'capacity': self.capacity,
            'infant_passengers': self.infant_passengers,
            'days': self.days,
            'created_at': self.created_at
        }
    

class PassengersModel(db.Model):
    __tablename__ = "passengers"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    scheduled_event_id = db.Column(db.String(32))
    booker_id = db.Column(db.String(32))
    salesman_id = db.Column(db.String(32))
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(345))
    phone = db.Column(db.String(20), nullable=False)
    adult_passengers = db.Column(db.Integer)
    children_passengers = db.Column(db.Integer)
    infant_passengers = db.Column(db.Integer)
    adult_price = db.Column(db.Integer)
    children_price = db.Column(db.Integer)
    infant_price = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    t_shirt = db.Column(db.Integer)
    food = db.Column(db.Integer)
    partial_payment = db.Column(db.Integer)
    payment_type = db.Column(db.String(80), nullable=False)
    payment_status = db.Column(db.String(80), nullable=False)
    commission_received = db.Column(db.Boolean)
    checked_in = db.Column(db.Boolean)
    notes = db.Column(db.Text, nullable=False)
    created_at = db.Column(DateTime, default=datetime.now)

    def serialize(self):
        return {
            'id': self.id,
            'scheduled_event_id': self.scheduled_event_id,
            'salesman_id': self.salesman_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'adult_passengers': self.adult_passengers,
            'children_passengers': self.children_passengers,
            'infant_passengers': self.infant_passengers,
            'adult_price': self.adult_price,
            'children_price': self.children_price,
            'infant_price': self.infant_price,
            'total_price': self.total_price,
            't_shirt': self.t_shirt,
            'food': self.food,
            'payment_type': self.payment_type,
            'payment_status': self.payment_status,
            'partial_payment': self.partial_payment,
            'commission_received': self.commission_received,
            'checked_in': self.checked_in,
            'booker_id': self.booker_id,
            'notes': self.notes,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

class TransactionsModel(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    passenger_id = db.Column(db.String(32)) # make this a list of passenger ids
    created_at = db.Column(DateTime, default=datetime.now)
    
    def serialize(self):
        return {
            "id": self.id,
            "passenger_id": self.passenger_id,
            "created_at": self.created_at,
        }