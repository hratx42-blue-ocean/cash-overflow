FROM node:12
ENV MONGO_URI mongodb+srv://ross:hratx420@greenocean-naa2k.gcp.mongodb.net/greenOcean?retryWrites=true&w=majority
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i
COPY . .

WORKDIR server
RUN npm i
WORKDIR /usr/src/app/client
RUN npm i
RUN npx webpack --config webpack.config.js

EXPOSE 8000

WORKDIR /usr/src/app/server/bin
CMD node www
