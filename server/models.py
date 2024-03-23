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

class SalesmenModel(db.Model):
    __tablename__ = "salesmen"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(345), unique=True)
    phone = db.Column(db.String(20), nullable=False)
    notes = db.Column(db.Text, nullable=False)
    created_at = db.Column(DateTime, default=datetime.now)

class EventsModel(db.Model):
    __tablename__ = "events"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    event_title = db.Column(db.String(80), nullable=False)
    event_description = db.Column(db.Text)
    event_start_date = db.Column(db.DateTime, nullable=False)
    event_end_date = db.Column(db.DateTime, nullable=False)
    event_start_time = db.Column(db.Time, nullable=False)
    event_end_time = db.Column(db.Time, nullable=False)
    event_run_days = db.Column(db.String(7))  # Assuming we store days as "MTWTFSS" format
    event_repeated = db.Column(db.Boolean)
    event_repeated_weekly = db.Column(db.Boolean)
    event_repeated_biweekly = db.Column(db.Boolean)
    event_capacity = db.Column(db.Integer, nullable=False)
    event_age_21_plus = db.Column(db.Boolean)
    adult_passengers = db.Column(db.Integer)
    children_passengers = db.Column(db.Integer)
    infant_passengers = db.Column(db.Integer)
    created_at = db.Column(DateTime, default=datetime.now)


class PassengersModel(db.Model):
    __tablename__ = "passengers"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    event_id = db.Column(db.String(32), unique=True)
    booker_id = db.Column(db.String(32), unique=True)
    year = db.Column(db.Integer)
    month = db.Column(db.Integer)
    day = db.Column(db.Integer)
    start_time = db.Column(db.Integer)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(345), unique=True)
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
    payment_type = db.Column(db.String(80), nullable=False)
    payment_status = db.Column(db.String(80), nullable=False)
    commission_received = db.Column(db.Boolean)
    notes = db.Column(db.Text, nullable=False)
    created_at = db.Column(DateTime, default=datetime.now)

    def serialize(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'year': self.year,
            'month': self.month,
            'day': self.day,
            'start_time': self.start_time,
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
            'commission_received': self.commission_received,
            'booker_id': self.booker_id,
            'notes': self.notes,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

# class ReservationsModel(BaseModelWithID):
#     event_id: str = Field(..., description="Identifier of the event being reserved")
#     customer_id: str = Field(..., description="Identifier of the customer making the reservation")
#     date: datetime = Field(..., description="Date of the event")
#     number_of_participants: int = Field(..., gt=0, description="Number of participants in the reservation")
#     status: str = Field(..., description="Status of the reservation (confirmed, cancelled, pending)")
#     total_price: float = Field(..., gt=0, description="Total price for the reservation")
#     created_at: datetime = Field(default_factory=datetime.now)

# class TransactionsModel(BaseModelWithID):
#     customer_id: str = Field(..., description="Identifier of the customer making the payment")
#     reservation_id: str = Field(..., description="Identifier of the reservation")
#     amount: float = Field(..., gt=0, description="Amount paid")
#     payment_method: str = Field(..., description="Method of payment (e.g., credit card, PayPal, etc.)")
#     status: str = Field(..., description="Status of the transaction (e.g., pending, completed, refunded)")
#     created_at: datetime = Field(default_factory=datetime.now)