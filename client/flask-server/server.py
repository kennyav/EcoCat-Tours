import json, os, logging
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request, send_from_directory
from flask_cors import CORS



logging.getLogger('flask_cors').level = logging.DEBUG

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__, static_url_path='', static_folder=os.path.abspath('../build'))
app.secret_key = env.get("APP_SECRET_KEY")
app.config['SESSION_COOKIE_DOMAIN'] = '.localhost'
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True  # Use True if your site is served over HTTPS
app.config["DEBUG"] = True
CORS(app, supports_credentials=True) 

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
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    print("Token", token)
    session["user"] = token
    return redirect("/")

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


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        index_path = os.path.join(app.static_folder, 'index.html')
        with open(index_path, 'r') as file:
            html = file.read()
            # Replace 'user' with the actual key you use in the session
            session_data = json.dumps(session.get('user'), indent=4)
            # Dynamically insert a script tag with the session data
            html = html.replace('</head>', f'<script>window.initialSessionData = {session_data};</script></head>')
        return app.response_class(html, content_type='text/html')

# instantiate the local server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))