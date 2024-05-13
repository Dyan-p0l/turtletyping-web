FROM node:18

WORKDIR /turtletypes_react

ADD package.json package-lock.json /turtletypes_react/

RUN npm install

ADD src/ ./src
ADD public/ ./public


EXPOSE 3000

CMD [ "npm", "start" ]
