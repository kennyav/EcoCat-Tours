from pydantic import BaseModel, Field, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional

class BaseModelWithID(BaseModel):
    id: Optional[str] = Field(None, alias="_id", description="MongoDB's unique identifier")
    model_config = ConfigDict(populate_by_name=True)

class CustomersModel(BaseModelWithID):
    first_name: str = Field(..., min_length=1, description="The first name of the customer.")
    last_name: str = Field(..., min_length=1, description="The last name of the customer.")
    email: EmailStr = Field(..., description="The email address of the customer.")
    phone: str = Field(..., pattern=r"^\+?[1-9]\d{1,14}$", description="The phone number of the customer, following international format.")
    created_at: datetime = Field(default_factory=datetime.now, description="The timestamp when the customer record was created.")

class SalesmenModel(BaseModelWithID):
    first_name: str = Field(..., min_length=1, description="The first name of the salesman.")
    last_name: str = Field(..., min_length=1, description="The last name of the salesman.")
    email: EmailStr = Field(..., description="The email address of the salesman.")
    phone: str = Field(..., pattern=r"^\+?[1-9]\d{1,14}$", description="The phone number of the salesman, following international format.")
    notes: Optional[str] = Field(None, description="Optional notes about the salesman.")
    created_at: datetime = Field(default_factory=datetime.now, description="The timestamp when the salesman record was created.")

class EventsModel(BaseModelWithID):
    title: str = Field(..., description="The title of the event")
    description: Optional[str] = Field(None, description="Detailed description of the event")
    location: str = Field(..., description="Location of the event")
    start_time: datetime = Field(..., description="Start time of the event")
    end_time: datetime = Field(..., description="End time of the event")
    capacity: int = Field(..., gt=0, description="Maximum number of participants")
    price_per_person: float = Field(..., gt=0, description="Price per participant")
    status: str = Field(..., description="Status of the event (e.g., available, cancelled, completed)")
    salesman_id: Optional[str] = Field(None, description="Identifier of the salesman managing the event")
    created_at: datetime = Field(default_factory=datetime.now)

class ReservationsModel(BaseModelWithID):
    event_id: str = Field(..., description="Identifier of the event being reserved")
    customer_id: str = Field(..., description="Identifier of the customer making the reservation")
    date: datetime = Field(..., description="Date of the event")
    number_of_participants: int = Field(..., gt=0, description="Number of participants in the reservation")
    status: str = Field(..., description="Status of the reservation (confirmed, cancelled, pending)")
    total_price: float = Field(..., gt=0, description="Total price for the reservation")
    created_at: datetime = Field(default_factory=datetime.now)

class TransactionsModel(BaseModelWithID):
    customer_id: str = Field(..., description="Identifier of the customer making the payment")
    reservation_id: str = Field(..., description="Identifier of the reservation")
    amount: float = Field(..., gt=0, description="Amount paid")
    payment_method: str = Field(..., description="Method of payment (e.g., credit card, PayPal, etc.)")
    status: str = Field(..., description="Status of the transaction (e.g., pending, completed, refunded)")
    created_at: datetime = Field(default_factory=datetime.now)
