FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./dist/ /usr/share/nginx/html

EXPOSE 80
