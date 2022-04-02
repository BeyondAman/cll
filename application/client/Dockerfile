FROM node:16.3.0-alpine as builder

RUN mkdir -p /app
WORKDIR /app

# install packages
COPY package.json yarn.lock ./
RUN yarn

# copy and build code
COPY . /app 

RUN npm run build 
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html 
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
