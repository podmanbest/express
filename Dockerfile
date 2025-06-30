FROM node:18-alpine

# Install dependencies
RUN apk update && apk add --no-cache \
    bash \
    curl

WORKDIR /app
COPY ./src .
RUN chmod +x entrypoint.sh
RUN npm init
EXPOSE 3000

CMD ["node", "server.js"]