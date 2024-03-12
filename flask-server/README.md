## Project Setup

1. **Open the Codespace**: Open the Codespace for this project. All the code for this project is available in this Codespace.

2. **Activate the virtual environment**: Activate the virtual environment with the following command:
    For Unix or MacOS:

    ```bash
    source /workspaces/EcoCat-Tours/flask-server/venv/bin/activate    
    ```

3. **Start the MongoDB service**: We're using MongoDB for our database. We've set up a Docker container for the MongoDB service. To start the MongoDB service, run the following command:

    ```bash
    cd /workspaces/EcoCat-Tours/flask-server
    docker-compose up -d
    ```

4. **Test MongoDB with pytest**
    ```
    cd /workspaces/EcoCat-Tours/flask-server/tests
    pytest test_customers_crud.py
    ```

5. **Run the Hello World demo**: To run a demo that prints "Hello, World!", navigate to the `s/workspaces/EcoCat-Tours/flask-server` directory and run the following command:

    ```bash
    cd /workspaces/EcoCat-Tours/flask-server
    python run.py
    ```

## Changes Made
- MongoDB setup, safeguards, maintainable practices
- Important Files:
    - [WIP Models](app/models/models.py)
    - [Database Service](app/services/database/database_service.py)
    - [Index Setup](app/services/database/database_service.py)
    - [MongoDB Client](app/services/database/mongodb_client.py)
    - [Database Config](app/services/database/mongodb_client.py)
    - [CRUD Test for Demo](app/services/database/mongodb_client.py)
- TBD/WIP:
    - Checking models against requirements