FROM node:16.20-bullseye

RUN npm i -g typescript
RUN npm i -g ts-node
RUN npm i -g nodemon 

WORKDIR /app

COPY ../../package.json ./

RUN npm install

COPY ../../ ./

RUN mv ./docker/prod/.env.server.docker .env

RUN npm run build

COPY ../../app/docs ./dist/docs

EXPOSE 3306

ENTRYPOINT ["npm","run","start:prod"]