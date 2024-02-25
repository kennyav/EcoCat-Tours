from flask import Flask
import os
import requests 
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS , cross_origin
import logging # for loggin the 



logging.getLogger('flask_cors').level = logging.DEBUG



load_dotenv(dotenv_path="./.env.local")
print(os.environ.get("TEST_API_KEY", ""))


DEBUG = bool(os.environ.get("DEBUG",True))
print("DEBUG IS", DEBUG)

app = Flask(__name__)
CORS(app) #cross-origin resource sharing needs to on in case there is a request to our API.
app.config["DEBUG"] = DEBUG 




@app.route("/booking-search")
@cross_origin()
def bookingSearch():
      searchQuery = request.args.get("query")
      return {"searchQuery": searchQuery}




@app.route("/members")
def members():
   return {"members": ["member1", "member2", "member3"]}


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5050)