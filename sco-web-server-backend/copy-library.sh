#!/bin/bash

# Eliminar librería y copiar el compilado nuevo
echo 'Borrando antigua carpeta "./sco-web-server/node_modules/sco-nestjs-utilities"'
rm -rf ./sco-web-server/node_modules/sco-nestjs-utilities
echo 'Copiando nuevo contenido de "./../sco-nestjs-utilities/dist/sco-nestjs-utilities/" a "./sco-web-server/node_modules/sco-nestjs-utilities"'
cp -r ./../sco-nestjs-utilities/dist/libs/sco-nestjs-utilities/ ./sco-web-server/node_modules/sco-nestjs-utilities
echo 'Copia completada'

# Modificar versión del package json por version 'test'
archivo="./sco-web-server/node_modules/sco-nestjs-utilities/package.json"
nuevo_contenido='  "version": "test",'

# Verificar si el archivo existe
if [ -f "$archivo" ]; then
    # Modificar el contenido de la línea 2 (Versión)
    sed -i "3s/.*/$nuevo_contenido/" "$archivo"
    echo "El contenido de la línea 3 se ha actualizado correctamente"
else
    echo "El archivo $archivo no existe"
fi