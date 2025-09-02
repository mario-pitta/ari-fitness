#!/bin/bash

# Obter os IDs dos processos dos arquivos de log ou variáveis de ambiente
IONIC_PID=$(cat ionic.pid) # Substitua 'ionic.pid' pelo caminho do arquivo de log
NEST_PID=$(cat nest.pid) # Substitua 'nest.pid' pelo caminho do arquivo de log

# Parar os servidores
kill $IONIC_PID
kill $NEST_PID

echo "Servidores parados."