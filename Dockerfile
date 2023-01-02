#stage-1 - build angular app
FROM node:gallium-alpine as build-web

WORKDIR /personalweb
COPY . .

RUN npm i
RUN npm run build

#stage-2 - copy build output to nginx server
FROM nginx:alpine
COPY --from=build-web /personalweb/dist/out /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 4200
