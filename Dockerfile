FROM node:latest as build 

WORKDIR /react-app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.19

EXPOSE 80

COPY --from=build /react-app/build /usr/share/nginx/html