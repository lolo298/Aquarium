FROM node:18-alpine as build

WORKDIR /usr/src/app

RUN apk update && apk add build-base g++ cairo-dev pango-dev giflib-dev

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npm i -w web canvas --build-from-source

RUN npm run build


FROM node:alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/apps/web/dist ./

RUN npm install -g next

EXPOSE 80

CMD ["next", "start", "-p", "80"]
