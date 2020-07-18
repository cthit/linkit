# build environment
FROM node:12.18.2 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_BACKEND_URL "/api"
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]