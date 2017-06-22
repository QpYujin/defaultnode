# Pushing to dockerhub need some planning

# First set up connection to a docker hub (NOTE: Currently just to docker hub, eventually branching out to other registry)
docker login --password $1 --username $2 --email $3

docker tag $1
docker push kokyj93/$2
if [ $? -eq 0 ]; then
        echo "Successfully pushed image"
else
        echo "Fail to push image"
        exit 1
fi




