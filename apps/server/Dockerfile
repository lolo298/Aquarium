FROM node:alpine

WORKDIR /usr/src/app

RUN apk update && apk add build-base g++ cairo-dev pango-dev giflib-dev

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY . ./

RUN pnpm install -r --offline

EXPOSE 8000

CMD ["pnpm", "start:server"]