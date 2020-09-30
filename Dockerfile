FROM node:14

WORKDIR '/app'

COPY ./server/dist ./dist

EXPOSE 5000

CMD cd dist && node Index.js