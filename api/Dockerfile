FROM python:3.9 
FROM node:15.14-alpine

WORKDIR /app 
EXPOSE 5050 

COPY Pipfile Pipfile.lock ./ 
# COPY ../package.json ../package-lock.json ./ 

# install pip
RUN apk add --no-cache py-pip

RUN pip install pipenv 
RUN pip install flask-cors

RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt 

RUN ../
RUN npm run build

COPY . ./
RUN python3 server.py