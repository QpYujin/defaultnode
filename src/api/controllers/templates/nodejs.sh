#! /bin/bash
# Create repo on user github account
# $1 : token
# $2 : Repo Name
# $3 : Tags
# $4 : Username
curl -i https://api.github.com/user/repos?access_token=$1 -d '{"name":"'$2'"}'
# Clone the chosen repo
git clone --bare https://github.com/cloudoptim/consensus-mvp.git
cd consensus-mvp.git
# Pushed clone repo to users repo
git push --mirror https://$1@github.com/$4/$2.git
cd ..
# Delete the bare repo
rm -rf consensus-mvp.git
if [ $? -eq 0 ]; then
    echo "Successfully removed folder"
else
    echo "Fail to remove folder"
    exit 1
fi
# Cloned the USER'S flask repo into local
git clone -b consensus_dev https://$1@github.com/$4/$2.git
cd $2
if [ $? -eq 0 ]; then
    echo "Successfully entered folder"
else
    echo "Fail to enter folder"
    exit 1
fi
# Tags will be taken from user choice eventually
git checkout consensus_dev
git fetch 
cd consensus-backend/consensus-backend/
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
NAME=$(grep "image" docker-compose.yml | sed 's/^.*: //')
# Add tag into name
TAGGED_NAME=$NAME:1.0.0
# Create a new tag with version from original tag
docker tag $NAME $TAGGED_NAME
docker push $TAGGED_NAME
cd ..
# Removed the clone repo
rm -rf $2
# Will add kubectl command here for deployment
# but if any changes is required with yaml will do it from node
kubectl apply -f nodejs.yaml
