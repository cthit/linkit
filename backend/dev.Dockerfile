FROM node:13.2.0

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src src

EXPOSE 4000

CMD ["npm", "run", "dev"]