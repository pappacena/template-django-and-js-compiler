FROM python:3.6-jessie

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# RUN apt-get update && \
#     apt-get autoremove && apt-get clean && \
#     rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir \
    -r requirements.txt

COPY . /usr/src/app

WORKDIR /usr/src/app/storchestrator
