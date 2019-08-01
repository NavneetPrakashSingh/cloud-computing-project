FROM node:8.11.4
RUN npm install sails -g
ENV NODE_ENV development
COPY ["package.json","package-lock.json*","./"]
RUN npm install
COPY . .
EXPOSE 1337
CMD sails lift --drop