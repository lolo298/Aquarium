FROM node:18-alpine as build

WORKDIR /usr/src/app

RUN apk update && apk add build-base g++ cairo-dev pango-dev giflib-dev

COPY . ./

RUN npm ci

RUN npm i -w web canvas --build-from-source

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]
