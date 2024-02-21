# setup
source /workspaces/EcoCat-Tours/flask-server/venv/bin/activate

# install dependencies
cd flask-server
pip install -r requirements.txt

# set environment variable
export FLASK_APP=/workspaces/EcoCat-Tours/flask-server/run.py

# demo
flask run

# click bottom right
Open in browser