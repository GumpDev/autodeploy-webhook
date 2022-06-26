FROM node:16-alpine

WORKDIR /app

ADD package*.json ./
ADD index.js ./index.js
ADD repositories.json ./repositories.json

RUN npm i -D