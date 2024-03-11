from app.services.database.mongodb_client import MongoDBClient
from pymongo.errors import DuplicateKeyError
from pydantic import ValidationError
from app.models.models import CustomersModel  # Import additional models as needed
import logging

class DatabaseService:
    def __init__(self):
        self.db = MongoDBClient().db

    def insert_document(self, collection_name, document_data):
        # Dynamically retrieve the model class based on the collection name
        model_cls = globals().get(f"{collection_name.capitalize()}Model")
        if model_cls is None:
            logging.error(f"No model defined for: {collection_name}")
            return None

        try:
            document = model_cls(**document_data).dict()
            return self.db[collection_name].insert_one(document).inserted_id
        except (DuplicateKeyError, ValidationError) as e:
            logging.error(f"Error inserting document into {collection_name}: {e}")
            return None

    def delete_document(self, collection_name, filter_criteria):
        """
        Deletes documents based on the specified filter criteria from the collection.
        
        :param collection_name: The name of the collection from which to delete the document.
        :param filter_criteria: A dictionary specifying the filter criteria for documents to delete.
        :return: The result of the delete operation.
        """
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
