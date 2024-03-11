from pymongo import MongoClient
import logging
from threading import Lock
from config.db_config import MONGO_URI, DB_NAME

class MongoDBClient:
    _instance = None
    _lock = Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(MongoDBClient, cls).__new__(cls)
                    try:
                        cls._instance.client = MongoClient(MONGO_URI)
                        cls._instance.db = cls._instance.client[DB_NAME]
                        logging.info("MongoDB connection established")
                    except Exception as e:
                        logging.error(f"MongoDB connection failed: {e}")
                        raise
        return cls._instance
