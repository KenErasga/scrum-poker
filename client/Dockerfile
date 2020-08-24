FROM node:alpine

WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .

RUN npm install -g serve

EXPOSE 5000

CMD ["npm", "run", "startbuild"]