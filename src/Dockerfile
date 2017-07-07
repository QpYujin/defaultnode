FROM node
MAINTAINER Neha Khairnar <neha@qpair.io>

# Install dockerize
#ENV DOCKERIZE_VERSION v0.3.0
#RUN curl -L https://github.js.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz | tar zx -C /usr/bin

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install -g grunt-cli bower
RUN apt-get update && apt-get install vim -y

# Bundle app source
COPY . /usr/src/app
RUN grunt build

EXPOSE 3000

#ENTRYPOINT ["dockerize"]

#CMD ["-wait", "tcp://mysql:3306", "-wait", "tcp://redis:6379", "npm", "start" ]

CMD ["npm", "start" ]
