FROM node:12-alpine

ARG PORT=3030

RUN mkdir -p /app
WORKDIR /app

# install packages
COPY package.json yarn.lock ./
RUN yarn

# copy code
COPY . /app 
EXPOSE $PORT

CMD ["npm", "start"]
