# Stage 1
# START BACKEND / NODEJS
FROM node:10 AS node
COPY ./web /web
WORKDIR /web
RUN npm i
RUN $(npm bin)/ng build --prod

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json *yarn* ./

RUN npm install -g nodemon
RUN npm install
RUN npm audit fix

COPY --chown=node:node . .

EXPOSE 8080
CMD [ "nodemon"]

# Stage 2
FROM nginx:1.17.8-alpine AS web
COPY --from=node /web/dist/web/ /usr/share/nginx/html

