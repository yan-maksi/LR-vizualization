FROM node:18-slim

RUN npm install -g http-server

WORKDIR /LR-vizualization

COPY . /LR-vizualization/

EXPOSE 8080

CMD ["http-server", "-p", "8080"]