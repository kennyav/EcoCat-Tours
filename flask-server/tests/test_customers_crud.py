import pytest
import sys

# Adjust your path as necessary to import the necessary modules
sys.path.insert(0, '/workspaces/EcoCat-Tours/flask-server/')
from app.services.database.database_service import DatabaseService
from app.services.database.index_setup import setup_indexes

@pytest.fixture(scope="module")
def db_service():
    # Perform any setup required before the tests run
    setup_indexes()  # Set up database indexes once per module
    return DatabaseService()

@pytest.fixture(scope="function")
def customer_data():
    # This fixture returns customer data and can be modified for each test if needed
    return {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "phone": "+1234567890",
    }

@pytest.fixture(scope="function", autouse=True)
def cleanup(db_service, customer_data):
    # No setup required here, but we define this fixture to run cleanup after each test
    yield  # Let the test run
    # After the test, perform cleanup
    db_service.delete_document('customers', {'email': customer_data['email']})

def test_customers_crud(db_service, customer_data):
    # Insert a customer document
    customer_id = db_service.insert_document('customers', customer_data)
    assert customer_id is not None, "Failed to insert customer"

    # Find the inserted customer document
    customer = db_service.find_one('customers', {'email': customer_data['email']})
    assert customer is not None, "Failed to find customer"

    # Update the inserted customer document
    update_result = db_service.update_document('customers', {'email': customer_data['email']}, {"first_name": "Jane"})
    assert update_result is not None and update_result.modified_count > 0, "Failed to update customer"
