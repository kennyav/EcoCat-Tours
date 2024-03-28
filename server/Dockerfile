# FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder



# WORKDIR /poop
# COPY requirements.txt /poop/

# RUN --mount=type=cache,target=/root/.cache/pip \
#     pip install -r requirements.txt

# COPY . /poop/


# ENTRYPOINT ["flask"]
# RUN ["pip","install",""]
# CMD ["run", "-p", "8000", "--host", "0.0.0.0"]

# FROM builder as dev-envs

# RUN <<EOF
# apk update
# apk add git bash
# EOF

# RUN <<EOF
# addgroup -S docker
# adduser -S --shell /bin/bash --ingroup docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /


















# FROM python:3.9
FROM python:3.8.5
ENV VIRTUAL_ENV=/.venv/
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

EXPOSE 8000

WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r /backend/requirements.txt
RUN export FLASK_RUN_PORT=8000
RUN pip install python-dotenv


COPY . ./
CMD ["flask", "run"]




# RUN pip install -U python-dotenv


# CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]


# CMD ["flask", "run"]