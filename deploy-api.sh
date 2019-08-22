rm -rf ./src/api/Docker/deploy/src
rm -rf ./src/api/Docker/deploy/api
git clone git@bitbucket.org:garnetstar/pg-api.git src/api/Docker/deploy/api
mkdir ./src/api/Docker/deploy/src
cp -R src/api/Docker/deploy/api/src/* src/api/Docker/deploy/src/
rm src/api/Docker/deploy/src/composer*

if [ "$(docker ps -q -f name=pg-api-deploy)" ]; then
    docker stop pg-api-deploy
fi

docker build -f src/api/Docker/deploy/Dockerfile -t pg-api .
docker run --rm -d -v "$(pwd)"/src/api/Docker/deploy/src:/api --name pg-api-deploy pg-api:latest

