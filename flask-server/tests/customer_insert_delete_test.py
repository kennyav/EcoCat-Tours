import sys
sys.path.insert(0, '/workspaces/EcoCat-Tours/flask-server/')
import logging
from app.services.database.database_service import DatabaseService
from app.services.database.index_setup import setup_indexes

def main():
    logging.basicConfig(level=logging.INFO)
    setup_indexes()  # Set up database indexes

    db_service = DatabaseService()

    # Insert a customer document
    customer_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "phone": "+1234567890",
    }
    customer_id = db_service.insert_document('customers', customer_data)
    if customer_id:
        logging.info(f"Inserted customer ID: {customer_id}")
    else:
        logging.error("Failed to insert customer")

    # Delete the inserted customer document as a demonstration
    delete_result = db_service.delete_document('customers', {'email': 'johndoe@example.com'})
    if delete_result and delete_result.deleted_count > 0:
        logging.info("Customer deleted successfully")
    else:
        logging.error("Failed to delete customer")

if __name__ == "__main__":
    main()
