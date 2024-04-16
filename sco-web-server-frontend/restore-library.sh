#!/bin/bash

# Eliminar librería y reinstalar última versión
echo 'Borrando antigua carpeta "./sco-web-server/node_modules/sco-angular-components"'
rm -rf ./sco-web-server/node_modules/sco-angular-components
echo 'Instalado librería de nuevo... (npm i sco-angular-components)'
cd ./sco-web-server
npm i sco-angular-components