FROM node:14.5.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .
COPY package-lock.json .

RUN npm install --only=production

COPY . .

EXPOSE 8080
EXPOSE 4001
CMD [ "npm", "start" ]
