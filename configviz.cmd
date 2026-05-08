@echo off
setlocal

if "%~1"=="" (
    echo Usage: configviz ^<docker-compose.yml^>
    exit /b 1
)

call "%~dp0mvnw.cmd" -q -DskipTests spring-boot:run -Dspring-boot.run.arguments="configviz %*"
exit /b %ERRORLEVEL%

