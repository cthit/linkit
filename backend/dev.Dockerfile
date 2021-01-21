FROM node:14

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src src

EXPOSE 4000
EXPOSE 4001

CMD ["npm", "run", "dev"]