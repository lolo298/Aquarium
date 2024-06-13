FROM node:alpine as build

WORKDIR /usr/src/app

RUN npm install -g pnpm

RUN apk update && apk add build-base g++ cairo-dev pango-dev giflib-dev

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch 

COPY . ./

RUN pnpm install -r --offline

RUN pnpm build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/apps/web/dist /usr/share/nginx/html

EXPOSE 80
