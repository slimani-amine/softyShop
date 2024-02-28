FROM node:16.20-bullseye

WORKDIR /app

RUN npm i -g typescript
RUN npm i -g ts-node
RUN npm i -g nodemon 

COPY ../../package.json ./

RUN npm install

COPY ../../ ./

RUN mv ./docker/dev/.env.server.docker .env

EXPOSE 6001

ENTRYPOINT ["npm","run","start:dev"]