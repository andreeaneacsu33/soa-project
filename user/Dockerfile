FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY src .

EXPOSE 8090

CMD ["node", "app.js"]
