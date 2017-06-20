
#! /bin/bash

#shell script test for echo statement
echo "This is shell script for clonning repository"

#First clone a repo NOTE:Repo directory will be obtained from user in UI
echo $1
git clone $1
#If cloning is successful, ccd into folder and build image
if [ $? -eq 0 ]; then
        echo "Successfully cloned"
        cd $2
        sudo docker-compose build
        if [ $? -eq 0 ]; then
            echo "Image successfully build"
        else
            echo "Image build failed"
		    fi
else
        echo "Fail to clone repository"
        exit 1
fi

