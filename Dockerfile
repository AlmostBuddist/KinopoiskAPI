FROM node:16

WORKDIR /KVS/src/app

COPY "package.json" ./

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "dist/main.js"]