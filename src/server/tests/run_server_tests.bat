:: # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
:loop
SET MDB_PORT_27017_TCP_ADDR=localhost
mocha test.js

pause
goto loop
