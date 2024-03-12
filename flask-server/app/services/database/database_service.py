import logging
from typing import Optional, Dict, Any, Type

from pymongo.errors import DuplicateKeyError
from pydantic import ValidationError

from app.services.database.mongodb_client import MongoDBClient
from app.models.models import CustomersModel, SalesmenModel, EventsModel, ReservationsModel, TransactionsModel

# Centralize your logging configuration elsewhere in the application
# For example, in your main entry point, you might have:
# logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Map collection names to their respective Pydantic models for validation
MODELS_MAPPING: Dict[str, Type] = {
    "customers": CustomersModel,
    "salesmen": SalesmenModel,
    "events": EventsModel,
    "reservations": ReservationsModel,
    "transactions": TransactionsModel,
}

class DatabaseService:
    def __init__(self):
        self.db = MongoDBClient().db

    def insert_document(self, collection_name: str, document_data: Dict[str, Any]) -> Optional[Any]:
        model_cls = MODELS_MAPPING.get(collection_name.lower())
        if model_cls is None:
            logging.error(f"No model defined for: {collection_name}")
            return None

        try:
            document = model_cls(**document_data).model_dump()
            inserted_id = self.db[collection_name].insert_one(document).inserted_id
            logging.info(f"Successfully inserted document with ID {inserted_id} into {collection_name}")
            return inserted_id
        except (DuplicateKeyError, ValidationError) as e:
            logging.error(f"Error inserting document into {collection_name}: {e}")
            return None

    def delete_document(self, collection_name: str, filter_criteria: Dict[str, Any]) -> Optional[Any]:
        if collection_name not in self.db.list_collection_names():
            logging.error(f"No collection found with the name: {collection_name}")
            return None

        try:
            result = self.db[collection_name].delete_many(filter_criteria)
            if result.deleted_count > 0:
                logging.info(f"Deleted {result.deleted_count} documents from {collection_name}")
            else:
                logging.info(f"No documents found matching the criteria in {collection_name}")
            return result
        except Exception as e:
            logging.error(f"Error deleting document from {collection_name}: {e}")
            return None

    def find_one(self, collection_name: str, query: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        try:
            document = self.db[collection_name].find_one(query)
            if document:
                # Consider logging document ID or a summary instead of the whole document for better performance
                logging.info(f"Found document in {collection_name}")
            else:
                logging.info(f"No document matches the query in {collection_name}")
            return document
        except Exception as e:
            logging.error(f"Error retrieving document from {collection_name}: {e}")
            return None

    def find_documents(self, collection_name: str, query: Dict[str, Any]) -> Optional[list]:
        try:
            documents = list(self.db[collection_name].find(query))
            if documents:
                logging.info(f"Found {len(documents)} documents in {collection_name}")
            else:
                logging.info(f"No documents match the query in {collection_name}")
            return documents
        except Exception as e:
            logging.error(f"Error retrieving documents from {collection_name}: {e}")
            return None

    def update_document(self, collection_name: str, filter_criteria: Dict[str, Any], update_data: Dict[str, Any]) -> Optional[Any]:
        try:
            result = self.db[collection_name].update_many(filter_criteria, {'$set': update_data})
            if result.modified_count > 0:
                logging.info(f"Updated {result.modified_count} documents in {collection_name}")
            else:
                logging.info(f"No documents were updated in {collection_name}")
            return result
        except Exception as e:
            logging.error(f"Error updating document in {collection_name}: {e}")
            return None
