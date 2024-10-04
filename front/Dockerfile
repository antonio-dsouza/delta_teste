FROM node:latest

WORKDIR /home/frontend

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]