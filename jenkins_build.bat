:: Batch script for Jenkins

set DIR=%CD%

:: Set up server node modules
echo Setting up server node modules
cd %DIR%\src\server
call npm install

:: Build front end
echo building front-end
cd %DIR%\src\client
call npm install
call bower install
cd %DIR%\src\client
call .\jenkins_update.bat

:: NOTE : These lines are near identical to the ones found in docs\DEV_ENV_SETUP.txt
