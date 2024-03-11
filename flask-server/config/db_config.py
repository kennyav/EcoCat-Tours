from dotenv import load_dotenv
import os

load_dotenv('/workspaces/EcoCat-Tours/flask-server/.env')

MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')
