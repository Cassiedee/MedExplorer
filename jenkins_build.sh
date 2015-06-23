# Shell script for Jenkins

DIR=$PWD

# Set up server node modules
echo Setting up server node modules
cd $DIR/src/server
npm install

# Build front-end (src/client)
#echo building front-end
#cd $DIR/src/client
#npm install
#bower install
#cd $DIR/src/client
##./jenkins_update.bat
#grunt --force

# run tests for back-end (src/server)
echo running back-end tests
cd $DIR/src/server
mocha tests/test.js
