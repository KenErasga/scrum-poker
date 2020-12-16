FROM node:14 AS image
WORKDIR '/app'
COPY . .
RUN ls
RUN cd dist
EXPOSE 5000
CMD cd dist && node Index.js