#!/bin/bash

# Eliminar librería y reinstalar última versión
echo 'Borrando antigua carpeta "./sco-web-server/node_modules/sco-nestjs-utilities"'
rm -rf ./sco-web-server/node_modules/sco-nestjs-utilities
echo 'Instalado librería de nuevo... (npm i sco-nestjs-utilities)'
cd sco-web-server
npm i sco-nestjs-utilities