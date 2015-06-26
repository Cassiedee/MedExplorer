:: # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.

@echo off
:loop
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
For /f "tokens=1-3 delims=/:/ " %%a in ('time /t') do (set mytime=%%a-%%b-%%c)
set mytime=%mytime: =% 

mkdir ..\server\dist_old
move ..\server\dist ..\server\dist_old\dist_%mydate%_%mytime%
mkdir ..\server\dist
xcopy /Y /s app ..\server\dist

pause
goto loop