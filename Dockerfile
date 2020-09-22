FROM node:14

WORKDIR '/app'

COPY . .

RUN cd ./client && npm i
RUN cd ./server && npm i
RUN apt-get install curl

EXPOSE 5000

CMD cd ./server && npm run build && npm run start