
FROM node:22-alpine

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./ 

RUN npm ci --omit=dev

COPY --chown=node:node . .

RUN mkdir -p build/public/uploads

CMD ["sh", "-c", "cd build && node bin/server.js"]

EXPOSE 3000
