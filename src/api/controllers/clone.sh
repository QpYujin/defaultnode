
#! /bin/bash

#shell script test for echo statement
echo "This is shell script for clonning repository"

#First clone a repo NOTE:Repo directory will be obtained from user in UI
echo $1
git clone $1
#If cloning is successful, ccd into folder and build image
if [ $? -eq 0 ]; then
        echo "Successfully cloned">/usr/src/app/api/controllers/clonelog.txt
        cd $2
        #docker-machine create default
        #docker-machine start default
        eval $(docker-machine env vm  --shell bash)
        docker-compose build
        
        if [ $? -eq 0 ]; then
           echo "Image successfully build">/usr/src/app/api/controllers/clonelog.txt
           cd ..
           rm -rf $2 
        else
            echo "Image build failed">/usr/src/app/api/controllers/clonelog.txt
	fi
else
        echo "Fail to clone repository">usr/src/app/api/controllers/clonelog.txt
        exit 1
fi

