FROM node:alpine as build

WORKDIR /usr/src/app

RUN apk update && apk add build-base g++ cairo-dev pango-dev giflib-dev

COPY package-lock.json ./

RUN npm ci

COPY . ./

RUN npm i -w web canvas --build-from-source

RUN npm run build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/apps/web/dist /usr/share/nginx/html

EXPOSE 80