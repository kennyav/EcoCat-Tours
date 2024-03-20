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


# class CustomersModel(BaseModelWithID):
#     first_name: str = Field(..., min_length=1, description="The first name of the customer.")
#     last_name: str = Field(..., min_length=1, description="The last name of the customer.")
#     email: EmailStr = Field(..., description="The email address of the customer.")
#     phone: str = Field(..., pattern=r"^\+?[1-9]\d{1,14}$", description="The phone number of the customer, following international format.")
#     created_at: datetime = Field(default_factory=datetime.now, description="The timestamp when the customer record was created.")


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