FROM node:22-alpine AS client-build
WORKDIR /app
COPY --chown=node:node client .
RUN npm install
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --chown=node:node package.json .
RUN npm install

RUN mkdir -p /app/client/build/
COPY --chown=node:node example_config.js config.js
COPY --chown=node:node main.js .

COPY --chown=node:node --from=client-build /app/build ./client/build/

ENTRYPOINT [ "node", "main.js"]
