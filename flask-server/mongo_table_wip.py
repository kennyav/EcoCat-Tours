from pymongo import MongoClient

# Create a MongoClient to the running mongod instance
client = MongoClient('mongodb://localhost:27017/')

# List all databases
print(client.list_database_names())

# Get a reference to a database
test_customers_db = client['test_customers_db']

# Get a reference to a collection
test_customers_collection = test_customers_db['test_customers_collection']

test_documents = [
    {
        "CustomerID": "unique_customer_id",
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "john.doe@example.com", # Ensure uniqueness
        "Phone": "123-456-7890", # Ensure uniqueness
        "created_at": "current_timestamp",
        "Reservations": [ # Embedding reservations to reduce joins
            {
                "ReservationID": "unique_reservation_id",
                "ScheduleID": "unique_schedule_id",
                "SalesmanID": "unique_salesman_id",
                "CheckInStatus": "pending",
                "CommissionReceived": False,
                "ReservationNotes": "Some notes here",
                "CancellationPolicy": {
                    "PolicyID": "unique_policy_id",
                    "PolicyText": "Cancellation policy details",
                    "EffectiveFrom": "date",
                    "EffectiveTo": "date"
                },
                "Passengers": [ # Embedding passengers within reservations
                    {
                        "PassengerID": "unique_passenger_id",
                        "Type": "adult",
                        "FirstName": "Jane",
                        "LastName": "Doe",
                        "Age": 30
                    }
                ],
                "BookingAdditions": [ # Embedding booking additions within reservations
                    {
                        "AdditionID": "unique_addition_id",
                        "Type": "extra_baggage",
                        "Quantity": 2
                    }
                ],
                "PaymentDetails": { # Assuming one payment detail per reservation for simplification
                    "PaymentMethodID": "unique_payment_method_id",
                    "PaymentType": "Credit Card",
                    "PaymentProcessor": {
                        "PaymentProcessorID": "unique_processor_id",
                        "Name": "ProcessorName",
                        "Details": "Some processor details"
                    },
                    "Details": "Payment details",
                    "Status": "pending",
                    "created_at": "current_timestamp",
                    "updated_at": "current_timestamp"
                },
                "BoardingPasses": [
                    {
                        "BoardingPassID": "unique_boarding_pass_id",
                        "BoardingGroup": "A",
                        "SeatNumber": "12A",
                        "PrintedAt": "datetime"
                    }
                ]
            }
        ],
        "CustomerHistory": [ # Embedding customer history for direct access
            {
                "HistoryID": "unique_history_id",
                "HistoryType": "Transaction",
                "ReferenceID": "unique_reference_id",
                "EventDate": "datetime",
                "Details": "Some JSON or serialized details"
            }
        ]
    },
    {
        "CustomerID": "unique_customer_id_2",
        "FirstName": "Jane",
        "LastName": "Smith",
        "Email": "jane.smith@example.com", 
        "Phone": "098-765-4321", 
        "created_at": "current_timestamp",
        "Reservations": [
            {
                "ReservationID": "unique_reservation_id_2",
                "ScheduleID": "unique_schedule_id_2",
                "SalesmanID": "unique_salesman_id_2",
                "CheckInStatus": "confirmed",
                "CommissionReceived": True,
                "ReservationNotes": "Some other notes here",
                "CancellationPolicy": {
                    "PolicyID": "unique_policy_id_2",
                    "PolicyText": "Another cancellation policy details",
                    "EffectiveFrom": "date",
                    "EffectiveTo": "date"
                },
                "Passengers": [
                    {
                        "PassengerID": "unique_passenger_id_2",
                        "Type": "child",
                        "FirstName": "Bob",
                        "LastName": "Smith",
                        "Age": 10
                    }
                ],
                "BookingAdditions": [
                    {
                        "AdditionID": "unique_addition_id_2",
                        "Type": "meal",
                        "Quantity": 1
                    }
                ],
                "PaymentDetails": {
                    "PaymentMethodID": "unique_payment_method_id_2",
                    "PaymentType": "Debit Card",
                    "PaymentProcessor": {
                        "PaymentProcessorID": "unique_processor_id_2",
                        "Name": "AnotherProcessorName",
                        "Details": "Some other processor details"
                    },
                    "Details": "Other payment details",
                    "Status": "completed",
                    "created_at": "current_timestamp",
                    "updated_at": "current_timestamp"
                },
                "BoardingPasses": [
                    {
                        "BoardingPassID": "unique_boarding_pass_id_2",
                        "BoardingGroup": "B",
                        "SeatNumber": "21B",
                        "PrintedAt": "datetime"
                    }
                ]
            }
        ],
        "CustomerHistory": [
            {
                "HistoryID": "unique_history_id_2",
                "HistoryType": "Complaint",
                "ReferenceID": "unique_reference_id_2",
                "EventDate": "datetime",
                "Details": "Some other JSON or serialized details"
            }
        ]
    }
]

# Delete all documents from the collection
test_customers_collection.delete_many({})

# # Insert the test documents into the collection
for document in test_documents:
    test_customers_collection.insert_one(document)

# print the test documents in the collection
for document in test_customers_collection.find():
    print(document['FirstName'], document['LastName'], document['Email'], document['Phone'])
