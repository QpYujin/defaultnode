#! /bin/bash

# Create repo on user github account
# $1 : Username
# $2 : Password
# $3 : Repo_Name
# $4 : Chosen tag from UI
echo $1

#curl -u $1:$2 https://api.github.com/user/repos -d '{"name":"'$3'"}'

#curl -i -H 'Authorization: token "'$1'"' https://api.github.com/user/repos -d '{"name": "'$3'"}'

curl -i https://api.github.com/user/repos?access_token=$1 -d '{"name": "'$2'"}'

# Clone the chosen repo
git clone --bare https://github.com/cloudoptim/flasktemplate.git

cd flasktemplate.git

# Pushed clone repo to users repo
git push --mirror https://$1@github.com/$4/$2.git
cd ..
# Delete the bare repo
rm -rf flasktemplate.git
if [ $? -eq 0 ]; then
    echo "Successfully removed folder"
else
    echo "Fail to remove folder"
	exit 1
fi

# Cloned the USER'S flask repo into local
git clone -b dev_1.0.1 https://$1@github.com/$4/$2.git
cd $2
if [ $? -eq 0 ]; then
    echo "Successfully entered folder"
else
    echo "Fail to enter folder"
	exit 1
fi

# Tags will be taken from user choice eventually
git checkout tags/$3

git fetch 

eval $(docker-machine env vm --shell bash)
# Setup docker details
docker login --password Qpair@2013 --username qpair #--email qpair@contact.io

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
TAGGED_NAME=$NAME:$3

# Create a new tag with version from original tag
docker tag $NAME $TAGGED_NAME

docker push $TAGGED_NAME

cd ..

# Removed the clone repo
rm -rf $2

# Will add kubectl command here for deployment
# but if any changes is required with yaml will do it from node
kubectl apply -f /usr/src/app/api/controllers/templates/flask.yaml
