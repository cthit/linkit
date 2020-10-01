# build environment
FROM node:14 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV "production"
COPY package.json .
COPY yarn.lock .
RUN yarn
RUN yarn global add react-scripts@3.0.1
COPY . /app
RUN yarn run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
