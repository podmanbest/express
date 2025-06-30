## Prod
FROM node:18-alpine

WORKDIR /work/
COPY ./src/package*.json ./
RUN npm install
COPY ./src/ ./

CMD node .