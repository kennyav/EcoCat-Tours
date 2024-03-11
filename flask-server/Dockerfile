FROM python:3.8-slim-buster

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Run the application
CMD ["python", "app.py"]