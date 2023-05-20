FROM node:14-alpine

WORKDIR /hero/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build

# EXPOSE 8000
CMD [ "node","build/index.js" ]
