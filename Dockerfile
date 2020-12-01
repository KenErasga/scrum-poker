FROM node:14 AS build
ARG COGNITO_REGION
ARG COGNITO_USER_POOL_ID
ARG COGNITO_APP_CLIENT_ID
ARG SOCKETIO_HOST
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_KEY_ID
WORKDIR '/app'
COPY . /app
RUN ls
RUN cd client && yarn
RUN cd server && npm i
RUN cd client touch .env
RUN cd client echo "REACT_APP_COGNITO_REGION=$COGNITO_REGION" >> .env
RUN cd client echo "REACT_APP_COGNITO_USER_POOL_ID=$COGNITO_USER_POOL_ID" >> .env
RUN cd client echo "REACT_APP_COGNITO_APP_CLIENT_ID=$COGNITO_APP_CLIENT_ID" >> .env
RUN cd client echo "REACT_APP_SOCKETIO_HOST=$SOCKETIO_HOST" >> .env
RUN cd client echo "REACT_APP_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> .env
RUN cd client echo "REACT_APP_AWS_SECRET_KEY_ID=$AWS_SECRET_KEY_ID" >> .env
RUN echo $COGNITO_REGION
RUN cd server && npm run build

FROM node:14 AS image
WORKDIR '/app'
# COPY --from=build /app /app
COPY --from=build ./app/server/dist ./dist/
COPY --from=build ./app/server/package.json ./dist/package.json
RUN ls
RUN cd dist && npm i
EXPOSE 5000
CMD cd dist && node Index.js