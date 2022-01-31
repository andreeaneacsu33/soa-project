FROM node:12-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 8090

CMD ["node", "app.js"]
