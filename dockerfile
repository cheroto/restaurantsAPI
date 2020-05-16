FROM node:13-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY . .
RUN rm -frv .env

RUN npm install --only=prod
RUN npm run build


EXPOSE 8080

CMD [ "node", "dist/bootstrap.js" ]