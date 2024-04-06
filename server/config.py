from dotenv import load_dotenv
import os
import redis


load_dotenv()

class ApplicationConfig:
   #SECRET_KEY = os.environ["SECRET_KEY"]
   SECRET_KEY = "3a9a1a0b8da1e2d6edfddfcd60a7c6374b3cb9105ec0aae54e2b723bc04191b6"

   SQLALCHEMY_TRACK_MODIFICATIONS = False
   SQLALCHEMY_ECHO = True
   SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

   # SESSION_COOKIE_SAMESITE = "None"
   # SESSION_COOKIE_SECURE = True

   SESSION_TYPE = "redis"
   SESSION_PERMANANT = False
   #SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
   SESSION_REDIS = redis.from_url("redis://redis:6379/0")
