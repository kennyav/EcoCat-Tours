FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder



WORKDIR /poop
COPY requirements.txt /poop/

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

COPY . /poop/


ENTRYPOINT ["flask"]
RUN ["pip","install",""]
CMD ["run", "-p", "8000", "--host", "0.0.0.0"]

FROM builder as dev-envs

RUN <<EOF
apk update
apk add git bash
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /


















