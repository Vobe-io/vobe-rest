FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
USER node

RUN npm install
RUN npm audit fix

COPY --chown=node:node . .

EXPOSE 8080
CMD [ "node", "bin/www.js" ]