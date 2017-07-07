     cd $2
     docker-compose build
     if [ $? -eq 0 ]; then
         echo "Image successfully build"
     else
         echo "Image build failed"
     fi
