from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

class CustomersModel(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\+?[1-9]\d{1,14}$")
    created_at: datetime = Field(default_factory=datetime.now)

# Define additional models like SalesmanModel here
