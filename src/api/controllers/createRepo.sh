#! /bin/bash
# Create repo on user github account
# $1 : Username
# $2 : Password
# $3 : Repo_Name
# $4 : Chosen tag from UI

curl -u $1:$2 https://api.github.com/user/repos -d '{"name":"'$3'"}'
# Clone the chosen repo

git clone --bare https://github.com/cloudoptim/flasktemplate.git

cd flasktemplate.git

# Pushed clone repo to users repo

git push --mirror https://github.com/$1/$3.git

cd ..
# Delete the bare repo

rm -rf $3.git
# Cloned the USER'S flask repo into local

git clone https://$1:$2@github.com/$1/$3.git
cd $3

# Setup docker details
docker login --password Qpair@2013 --username qpair --email qpair@contact.io

# Build, this command build the image and named it based on the docker-compose.yml
docker-compose build

#version: "2"
#services: 
#  web:
#    build: .
#    image: qpair/flaskapp
#    ports:
#       - "5000:5000"
#    volumes:
#- .:/code
# Using the above as the example, docker-compose build will only use 2 lines, build and image.
# Build: . means used a local dockerfile relative to the docker-compose.yml, image names it, naming concept is userAccount/imageName
# Grep the image name to be pushed and remove unnecessary details which in this case image: qpair/flaskapp becomes just qpair/flaskapp

NAME=$(grep "image:" docker-compose.yml | sed 's/^.*: //')
# Add tag into name

TAGGED_NAME=$NAME:$4

# Create a new tag with version from original tag
docker tag $NAME $TAGGED_NAME
docker push $TAGGED_NAME
cd ..

# Removed the clone repo
rm -rf $3
