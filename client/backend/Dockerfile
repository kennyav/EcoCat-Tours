FROM python:3.9 

WORKDIR /app 
EXPOSE 5050 

COPY Pipfile Pipfile.lock ./ 

RUN pip install pipenv 
RUN pip install flask-cors

RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt 

COPY . ./

CMD ["python3", "server.py"]