# 📁 server.py -----

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request
from flask_cors import CORS

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
CORS(app, appsupports_credentials=True) 
app.secret_key = env.get("APP_SECRET_KEY")

# configure our oauth
oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)


# setting up the login route
@app.route("/login")
def login():
    try:
        redirect_uri = url_for("callback", _external=True)
        auth_response = oauth.auth0.create_authorization_url(redirect_uri=redirect_uri)
        auth_url = auth_response["url"]  # Adjust based on actual keys
        session['oauth_state'] = auth_response["state"]  # Store state in session for later verification
        # Instead of returning the response object, return the URL in a JSON format
        return {"redirect_url": auth_url}
    except Exception as e:
        print(e)  # Log the exception to the console or a file
        return {"error": str(e)}, 500

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("http://localhost:3000/")

@app.route("/logout")
def logout():
    try:
        session.clear()
        logout_url = "https://" + env.get("AUTH0_DOMAIN") + "/v2/logout?" + urlencode({
            "returnTo": "http://localhost:3000/",  # Assuming your React app is served here
            "client_id": env.get("AUTH0_CLIENT_ID"),
        }, quote_via=quote_plus)
        return {"redirect_url": logout_url}
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500

# home route
@app.route("/api/user-data")
def api_user_data():
    user_session = session.get('user')  # Use a different variable name
    return json.dumps(user_session)

# # home route
# @app.route("/")
# def home():
#     return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

# instantiate the local server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3001))