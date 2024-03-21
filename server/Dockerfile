FROM alpine:7.2.4
FROM python:3.9
FROM redis

WORKDIR /backend
EXPOSE 6969 

COPY redis.conf ~/ecocat-reservation/server/config.py
CMD [ "redis-server", "~/ecocat-reservation/server/config.py" ]



# COPY requirements.txt requirements.txt
# RUN pip install -r requirements.txt

# COPY . ./

# CMD ["flask", "run", "--host=0.0.0.0"]