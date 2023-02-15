FROM node:18-alpine

RUN npm i -g @nestjs/cli

WORKDIR /home/api

CMD npm run start