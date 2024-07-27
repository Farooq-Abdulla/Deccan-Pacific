FROM node:alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY Backend .

EXPOSE 8000

CMD [ "node", "app.js" ]