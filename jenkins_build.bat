:: Batch script for Jenkins

set DIR=%CD%

:: Set up server node modules
echo Setting up server node modules
cd %DIR%\src\server
call npm install

:: Build front-end (src\client)
echo building front-end
cd %DIR%\src\client
call npm install
call bower install
cd %DIR%\src\client
call .\jenkins_update.bat

:: run tests for back-end (src\server)
echo running back-end tests
cd %DIR%\src\server
call npm install unit.js
call mocha tests\test.js

:: NOTE : These lines are near identical to the ones found in docs\DEV_ENV_SETUP.txt