FROM node:alpine

WORKDIR '/app'

COPY package.json .

COPY . .

RUN yarn

RUN yarn global add serve

EXPOSE 5000

CMD ["yarn", "run", "startbuild"]