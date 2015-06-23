# Shell script for Jenkins

DIR=$PWD

# Set up server node modules
echo Setting up server node modules
cd $DIR/src/server
npm install

# Build front-end (src/client)
echo building front-end
cd $DIR/src/client
npm install
bower install
#cd $DIR/src/client
##./jenkins_update.bat
mkdir ../server/dist_old
grunt --force

# run tests for back-end (src/server)
echo running back-end tests
cd $DIR/src/server
node node_modules/mocha/bin/mocha tests/test.js --reporter mocha-junit-reporter


# deploy docker containers
echo 'deploying docker container'
docker rm -f nodejs
docker build -t eric/nodejs:centos6 .
docker run -d -p 5000:5000 -p 10050:10050 --name nodejs eric/nodejs:centos6
