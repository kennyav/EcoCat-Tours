# FROM python:3.8.5
# ENV VIRTUAL_ENV=/.venv/
# RUN python3 -m venv $VIRTUAL_ENV
# ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# EXPOSE 8000

# WORKDIR /backend
# COPY requirements.txt /backend/
# RUN pip install -r /backend/requirements.txt
# RUN export FLASK_RUN_PORT=8000
# RUN pip install python-dotenv


# COPY . ./
# CMD ["flask", "run"]
# Use the official Python image as base
FROM python:3.8.5

# Set environment variables
ENV VIRTUAL_ENV=/.venv/
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Set the working directory in the container
WORKDIR /backend

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt
#RUN export FLASK_RUN_PORT=8000

# Copy the content of the local src directory to the working directory
COPY . .

# Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]
