@echo off

REM Etapa 1: Iniciar o servidor de desenvolvimento do Ionic em segundo plano
echo - Iniciando frontend em segundo plano...
start ionic serve > nul 2>&1
for "tokens=2 delims=," in ('tasklist "imagename eq node.exe" /fo csv ^| findstr "ionic"') do set IONIC_PID=%%i
echo Ionic PID: %IONIC_PID%

REM Etapa 2: Iniciar o servidor de desenvolvimento do Nest em segundo plano
echo - Iniciando backend em segundo plano...
start npm run --prefix ../ari-fitness-api start:dev > nul 2>&1
for "tokens=2 delims=," in ('tasklist "imagename eq node.exe" /fo csv ^| findstr "ari-fitness-api"') do set NEST_PID=%%i
echo Nest PID: %NEST_PID%

REM Exibir os IDs dos processos
echo Servidores iniciados em segundo plano:
echo Ionic PID: %IONIC_PID%
echo Nest PID: %NEST_PID%

REM Exibir os URLs e portas (pode variar)
for "tokens=4" in ('netstat -ano ^| findstr %IONIC_PID%') do set IONIC_PORT=%%p
for "tokens=4" in ('netstat -ano ^| findstr %NEST_PID%') do set NEST_PORT=%%p
echo APP URL: http://localhost:%IONIC_PORT%
echo Api URL: http://localhost:%NEST_PORT%

echo Aplicação pronta para desenvolvimento!