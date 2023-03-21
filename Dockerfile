FROM node:alpine as build

WORKDIR /home/app

COPY package.json ./

COPY . /home/app

RUN npm install

RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

COPY --from=build /home/app/dist /usr/share/nginx/html

EXPOSE 80