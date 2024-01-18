FROM node

WORKDIR "/opt"
COPY . .

RUN npm run docker-postbuild

ENTRYPOINT npm start


