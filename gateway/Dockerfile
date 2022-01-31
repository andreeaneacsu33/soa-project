FROM node:12-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 8092

CMD ["node", "app.js"]
