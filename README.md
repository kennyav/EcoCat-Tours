## Project Setup

1. **Open the Codespace**: Open the Codespace for this project. All the code for this project is available in this Codespace.

2. **Activate the virtual environment**: Activate the virtual environment with the following command:

    For Windows:

    ```bash
    /workspaces/EcoCat-Tours/flask-server/venv/Scripts/activate    
    ```

    For Unix or MacOS:

    ```bash
    source /workspaces/EcoCat-Tours/flask-server/venv/bin/activate    
    ```

3. **Install the required Python packages**: Run the following command to install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. **Start the MongoDB service**: We're using MongoDB for our database. We've set up a Docker container for the MongoDB service. To start the MongoDB service, run the following command:

    ```bash
    cd /workspaces/EcoCat-Tours
    docker-compose up -d
    ```

5. **Run the Hello World demo**: To run a demo that prints "Hello, World!", navigate to the `s/workspaces/EcoCat-Tours/flask-server` directory and run the following command:

    ```bash
    cd /workspaces/EcoCat-Tours/flask-server
    python run.py
    ```

6. **Test the MongoDB connection**: We've added a script to test the connection to the MongoDB database. To run this script, navigate to the `/workspaces/EcoCat-Tours/flask-server` directory and use the following command:

    ```bash
    cd /workspaces/EcoCat-Tours/flask-server
    python mongo_table_wip.py
    ```

## Changes Made
- mongo demo