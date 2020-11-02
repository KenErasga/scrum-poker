FROM node:14

WORKDIR '/app'

COPY ./server/dist ./dist
COPY ./server/package.json ./dist/package.json

RUN cd dist && npm i

EXPOSE 5000

CMD cd dist && node Index.js