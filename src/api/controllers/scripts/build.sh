#! /bin/bash

#shell script test for echo statement
echo "This is shell script for clonning repository"

# Setup docker login details
docker login --password Qpair@2013 --username qpair

#First clone a repo NOTE:Repo directory will be obtained from user in UI
echo $1
git clone $1
#If cloning is successful, ccd into folder and build image
if [ $? -eq 0 ]; then
        echo "Successfully cloned">/usr/src/app/api/controllers/clonelog.txt
        cd $2
        
        if [ ! -z $4 ]; then
          git checkout $3
          TAG=1.0.0
        else
          git checkout tags/$4
          TAG=$4
        fi

	git fetch

        #docker-machine create default
        #docker-machine start default
        eval $(docker-machine env vm  --shell bash)

        docker-compose build
	if [ $? -eq 0 ]; then
          echo "Image successfully build">/usr/src/app/api/controllers/clonelog.txt
        else
          echo "Image build failed">/usr/src/app/api/controllers/clonelog.txt
	fi
		
	# Grep the image name to be pushed and remove unnecessary details which in this case image: qpair/flaskapp becomes just qpair/flaskapp
        NAME=$(grep "image" docker-compose.yml | sed 's/^.*: //')
        # Add tag into name
        TAGGED_NAME=$NAME:$TAG

        # Create a new tag with version from original tag
        docker tag $NAME $TAGGED_NAME
        docker login --password Qpair@2013 --username qpair
        docker push $TAGGED_NAME        
        if [ $? -eq 0 ]; then
           echo "Image successfully pushed">/usr/src/app/api/controllers/clonelog.txt
           cd ..
           rm -rf $2 
        else
            echo "Image push failed failed">/usr/src/app/api/controllers/clonelog.txt
	    fi
else
        echo "Fail to clone repository">/usr/src/app/api/controllers/clonelog.txt
        exit 1
fi
