# build environment
FROM node:9.6.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install 
RUN npm install react-scripts@1.1.1 -g
COPY . /usr/src/app
RUN npm run build

# production environment
EXPOSE 3000
CMD ["npm", "start"]
