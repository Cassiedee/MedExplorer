:: # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
:loop
SET MDB_PORT_27017_TCP_ADDR=localhost
istanbul cover node_modules\mocha\bin\_mocha tests\test.js

pause
goto loop
