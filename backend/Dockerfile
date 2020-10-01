FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .
COPY package-lock.json .

RUN npm i --only=production

COPY . .

RUN npm run tsc

EXPOSE 4000
EXPOSE 4001
CMD [ "npm", "start" ]
