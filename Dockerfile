FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i
COPY . .

WORKDIR server
RUN npm i
WORKDIR /usr/src/app/client
RUN npm i

EXPOSE 8000

WORKDIR /usr/src/app/server/bin
CMD node www
