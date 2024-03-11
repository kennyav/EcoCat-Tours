from app.services.database.mongodb_client import MongoDBClient

def setup_indexes():
    db_client = MongoDBClient().db
    # Example: Setup unique index for customers collection
    db_client['customers'].create_index([("email", 1), ("phone", 1)], unique=True)
    # Extend this function to setup indexes for other collections as needed
