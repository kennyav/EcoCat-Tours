import json
import os
import requests
import http.client
from os import environ as env
from urllib.parse import quote_plus, urlencode


from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, session, url_for, send_from_directory
from flask_cors import CORS

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__, static_url_path='',
            static_folder=os.path.abspath('../build'))
app.secret_key = env.get("APP_SECRET_KEY")
app.config['SESSION_COOKIE_DOMAIN'] = '.localhost'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True for HTTPS
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


@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )


@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("serve_frontend", _external=True, _scheme='http'),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


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
            html = html.replace(
                '</head>', f'<script>window.initialSessionData = {session_data};</script></head>')
        return app.response_class(html, content_type='text/html')


@app.route('/users')
def all_users():
    conn = http.client.HTTPSConnection("dev-yjddoy71jz2xdtaq.us.auth0.com")

    payload = "{\"client_id\":\"gsqavogFSsDb9VogZkA1dNsodgw3hm75\",\"client_secret\":\"5sBO9x4NRhQIKf3vP8FY704ySNpW0z8S62r-JkvNXWys5CQOic0UrgFa4bOnVJJP\",\"audience\":\"https://dev-yjddoy71jz2xdtaq.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}"

    headers = { 'content-type': "application/json" }

    conn.request("POST", "/oauth/token", payload, headers)

    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))
    return data.decode("utf-8")


# instantiate the local server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
