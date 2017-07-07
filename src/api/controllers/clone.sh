#! /bin/bash

#shell script test for echo statement

#First clone a repo NOTE:Repo directory will be obtained from user in UI
echo $1
git clone $1
#If cloning is successful, ccd into folder and build image
if [ $? -eq 0 ]; then
        echo "Successfully cloned" >logfile.txt
else
        echo "Fail to clone repository" > logfile.txt
        exit 1
fi
