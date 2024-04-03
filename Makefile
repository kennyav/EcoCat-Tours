FLASK_APP_DIR = server
REACT_APP_DIR = frontend
FLASK_PORT = 8000

# Targets

# Start Flask server
flask:
	@echo "Starting Flask server on port $(FLASK_PORT)..."
	@cd $(FLASK_APP_DIR) && FLASK_APP=app.py flask run --port $(FLASK_PORT) || grep

# Start React development server
react:
	@echo "Starting React development server..."
	@cd $(REACT_APP_DIR) && npm start

# Start Redis server
redis:
	@echo "Starting Redis server..."
	@redis-server

# screen -r flask to open the flask terminal
# Run all services
run:
	@echo "Starting all services..."
	# @screen -dmS flask make flask
	@screen -dmS react make react
	@screen -dmS redis make redis


# Stop all services
stop:
	@echo "Stopping all services..."
	@pkill -f 'flask run' || true
	@pkill -f 'npm start' || true
	@pkill -f 'redis-server' || true
	@echo "All services stopped :)"
