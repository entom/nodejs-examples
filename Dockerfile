FROM node:16.3.0-slim
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY ["src/package.json", "src/package-lock.json*", "./"]

RUN npm install --production
RUN npm install -g nodemon

COPY ./src .

EXPOSE 3000

CMD [ "nodemon", "server.js" ]
#CMD [ "node", "server.js" ]
