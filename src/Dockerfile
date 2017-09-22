FROM node:boron
MAINTAINER Neha Khairnar <neha@qpair.io>
 
# Install dockerize
#ENV DOCKERIZE_VERSION v0.3.0
#RUN curl -L https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz | tar zx -C /usr/bin

RUN apt-get update && apt-get install -y sudo

RUN apt-get update && apt-get install -y python python-dev python-distribute python-pip sudo
RUN sudo apt-get update
RUN sudo apt-get install -y \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
RUN sudo apt-key fingerprint 0EBFCD88
RUN sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
RUN sudo apt-get update
RUN sudo apt-get install -y docker-ce

#RUN curl -L https://github.com/docker/machine/releases/download/v0.10.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine && chmod +x /tmp/docker-machine && sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

#RUN curl -L https://github.com/docker/compose/releases/download/1.12.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#RUN chmod +x /usr/local/bin/docker-compose

RUN curl -L https://github.com/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
RUN sudo chmod +x /usr/local/bin/docker-compose

RUN curl -L https://github.com/docker/machine/releases/download/v0.12.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine && chmod +x /tmp/docker-machine 
RUN sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

#RUN sudo docker-machine start default

#RUN chmod +x /usr/src/app/.git

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install -g grunt-cli bower
RUN apt-get update && apt-get install vim -y

# Bundle app source
COPY . /usr/src/app
COPY id_rsa /root/.ssh/id_rsa
COPY id_rsa.pub /root/.ssh/id_rsa.pub

RUN grunt build

EXPOSE 3000

RUN docker-machine create \
   --driver generic \
   --generic-ip-address=default.deploybytes.com \
   --generic-ssh-key ~/.ssh/id_rsa \
   --generic-ssh-user ubuntu \
   vm


#create machine for another instance
#RUN docker-machine create --driver amazonec2 --amazonec2-access-key  AKIAI4Y6AASGFMJV2NTQ --amazonec2-instance-type t2.micro --amazonec2-secret-key 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 --amazonec2-region us-east-1 --amazonec2-ami=ami-2a0c313c default
#RUN docker-machine start default
#RUN eval $(docker-machine env default --shell bash)
#RUN chmod +x /usr/src/app/.git



RUN sudo mv /usr/src/app/.kube $HOME
RUN chmod +x /usr/src/app/kubectl

RUN sudo mv /usr/src/app/kubectl /usr/local/bin/
RUN mv /usr/src/app/kops /usr/local/bin
RUN mv /usr/src/app/aws /usr/bin
COPY id_rsa.pub /root/.ssh/id_rsa.pub


RUN apt-get install unzip -y

RUN unzip /usr/src/app/.git.zip -d /usr/src/app/

RUN chmod +x /usr/src/app/buildinfo.sh
RUN chmod +x /usr/src/app/api/controllers/deploy.sh
RUN chmod +x /usr/src/app/api/controllers/config.yaml
RUN chmod +x /usr/src/app/api/controllers/clone.sh
RUN chmod +x /usr/src/app/api/controllers/push.sh
RUN chmod +x /usr/src/app/api/controllers/scripts/startcluster.sh
RUN chmod +x /usr/src/app/api/controllers/scripts/destroycluster.sh
RUN chmod +x /usr/local/bin/kubectl
RUN chmod +x /usr/local/bin/kops
RUN chmod +x /usr/bin/aws

#COPY /home/ec2-user/Dev_Active/deploybytes/.git /usr/src/app/.git
#ENTRYPOINT ["dockerize"]

CMD ["npm", "start" ]
