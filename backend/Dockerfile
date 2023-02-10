# Dockerfile
FROM node:16.19.0

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm i @nestjs/swagger

RUN npm i dayjs

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]