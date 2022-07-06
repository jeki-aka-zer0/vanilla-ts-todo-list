FROM node:16-alpine

RUN apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/* \
    && apk add --update nodejs npm \
    && apk add --no-cache curl

WORKDIR /app
