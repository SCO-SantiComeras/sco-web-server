
# SCO - Web Server

SCO-Web Server es una aplicación que simula ser un servidor web, similar a Apache2, pero con la capacidad de trabajar simultáneamente con otros servidores web. Esto significa que puedes configurar el puerto en el que funciona sin ningún conflicto.

Además de su función principal como servidor web, SCO-Web Server también puede utilizarse como un servidor multimedia para diferentes tipos de archivos, como fotos, vídeos, música y otros datos.

La aplicación proporciona un frontend intuitivo que te permite gestionar tus archivos fácilmente. Puedes añadir, copiar, eliminar y visualizar los archivos necesarios directamente desde la interfaz de usuario.

# Características principales

- Simula ser un servidor web, como Apache2, pero con flexibilidad para trabajar junto con otros servidores web.
- Funciona como un servidor multimedia para diferentes tipos de archivos.
- Ofrece un frontend intuitivo para la gestión y visualización de archivos.

# Requisitos
Podemos elegir entre dos tipos de instalación, sin docker:
- Node versión 16 o superior
- Npm & Pm2
- Mongodb

O la insalación con docker:
- Docker
- Docker files (https://github.com/SCO-SantiComeras/sco-docker-files)

# Instalación sin docker
1- Clonar el repositorio y ubicarse en el
<pre>
git clone https://github.com/SCO-SantiComeras/sco-web-server
cd sco-web-server
</pre>

2- Modificar los valores necesarios en los ficheros de entorno del backend
<pre>
# sco-web-server-backend\env\production.env
# *El resto de variables no modificar, podría resultar en un fallo de la aplicación

# APP
APP_PORT: 9000 (Puerto en el que inicia la aplicación)
APP_HOST: scoapps.es (Host en el que trabajará la aplicación)

# MONGO
MONGO_IP: 127.0.0.1 (Host de la base de datos MongoDB)
MONGO_PORT: 27017 (Puerto de la base de datos Mongodb)
MONGO_USER: (Usuario de la base de datos Mongodb)
MONGO_PASS: (Contraseña de la base de datos Mongodb)
MONGO_DATABASE: sco-web-server (Nombre de la base de datos Mongodb)

# WEBSOCKETS
WEBSOCKETS_PORT: 9001 (Puerto en el que trabajarán los websockets de la aplicación)
WEBSOCKETS_ORIGIN: http://scoapps.es,http://scoapps.es:80,http://scoapps.es:9000,http://scoapps.es:9001 (Origen de las peticiones de la aplicación)

# AUTH_EXPIRES_IN: 7d (Tiempo que durará la sesión iniciada antes de que expire)

# POPULATE
POPULATE_PUBLIC_USER: true (Indicador para crear o no un usuario público no administrador)

# NODE SERVER *Si se sigue la instalación, solo habrá que modificar la parte del a ruta '/home/sco/'
NODE_SERVER_ROOT_PATH: /home/sco/sco-web-server/dist/public (Ruta donde está alojada la aplicación (Frontend))
NODE_SERVER_SERVER_FOLDER: nodeserver (Nombre de la carpeta que se utilizará de servidor web)
</pre>

3- Modificar los valores necesarios en los ficheros de entorno del frontend
<pre>
# sco-web-server-frontend\src\environments\environment.prod.ts
# *El resto de variables no modificar, podría resultar en un fallo de la aplicación

hostname: 'scoapps.es', (Host donde trabajará la aplicación)
port: '9000', (Puerto de la aplicación)
apiPort: '9000', (Puerto de la api)
webSocketPort: '9001', (Puerto de los websockets de la api)
 
*Si se sigue la instalación, solo habrá que modificar la parte del a ruta '/home/sco/'
rootPath: '/home/sco/sco-web-server/dist/public', (Ruta donde está alojada la aplicación)
serverFolder: 'nodeserver', (Nombre de la carpeta que se utilizará de servidor)
</pre>

4- Instalar dependencias
<pre>
npm i
npm run install-deps
</pre>

5- Compilar los proyectos
<pre>
npm run build-prod
</pre>

6- Mover ficheros compilados del frontend
<pre>
cp -r ./sco-web-server-frontend/dist/sco-web-server/ ./sco-web-server-backend/dist/public/
</pre>

7- Mover el resultado de la compilación a la carpeta dist
<pre>
mkdir dist && cp -r ./sco-web-server-backend/dist/* ./dist/
</pre>

8- Instalar dependencias // Copiar backend node_modules si la compilación se realizó en el mismo equipo que la ejecutará
<pre>
- Instalar dependencias
  cd dist && npm i

- Copiar node_modules
  cd dist && cp -r ../sco-web-server-backend/node_modules .
</pre>

9- Iniciar aplicación con PM2
<pre>
npm run pm2:start:prod
</pre>

10- Ver logs de PM2 (Opcional)
<pre>
pm2 logs sco-web-server --lines 2000
</pre>

11- Acceder a la aplicación
<pre>
http://yourhost:appPort
</pre>

12- Usuarios por defecto
<pre>
- admin // Admin123456!
- public // Public123456!
</pre>

# Instalación con docker
1- Clonar el repositorio
<pre>
git clone https://github.com/SCO-SantiComeras/sco-web-server.git
</pre>

2- Situarse en el directorio del repositorio
<pre>
cd sco-web-server
</pre>

3- Modificar los valores necesarios en los ficheros de entorno del backend
<pre>
# sco-web-server-backend\env\docker-production.env

# APP
APP_PORT: 9000 (Puerto en el que inicia la aplicación)
APP_HOST: scoapps.es (Host en el que trabajará la aplicación)

# MONGO
MONGO_IP: 127.0.0.1 (Host de la base de datos MongoDB)
MONGO_PORT: 27017 (Puerto de la base de datos Mongodb)
MONGO_USER: (Usuario de la base de datos Mongodb)
MONGO_PASS: (Contraseña de la base de datos Mongodb)
MONGO_DATABASE: sco-web-server (Nombre de la base de datos Mongodb)

# WEBSOCKETS
WEBSOCKETS_PORT: 9001 (Puerto en el que trabajarán los websockets de la aplicación)
WEBSOCKETS_ORIGIN: http://scoapps.es,http://scoapps.es:80,http://scoapps.es:9000,http://scoapps.es:9001 (Origen de las peticiones de la aplicación)

# AUTH_EXPIRES_IN: 7d (Tiempo que durará la sesión iniciada antes de que expire)

# POPULATE
POPULATE_PUBLIC_USER: true (Indicador para crear o no un usuario público no administrador)

# NODE SERVER
* Las variables de rutas del servidor en docker son fijas ¡No modificar!
	- (/app/backend/dist/public/nodeserver)
</pre>

4- Modificar los valores necesarios en los ficheros de entorno del frontend
<pre>
# sco-web-server-frontend\src\environments\environment.docker.prod.ts

 hostname: 'scoapps.es', (Host donde trabajará la aplicación)
 port: '9000', (Puerto de la aplicación)
 apiPort: '9000', (Puerto de la api)
 webSocketPort: '9001', (Puerto de los websockets de la api)
 
* Las variables de rutas del servidor en docker son fijas ¡No modificar!
	- (/app/backend/dist/public/nodeserver)
</pre>

5- Descargar los ficheros de docker (https://github.com/SCO-SantiComeras/sco-docker-files/tree/main/sco-web-server/root)
<pre>
#Los ficheros de docker se tienen que situar en la carpeta raíz del repositorio ('sco-web-server')

- Dockerfile.prod
- docker-compose.prod.yml
</pre>

6- Si se han modificado los puertos de la aplicación en los ficheros de entornos, modificar el mapeo de puertos del fichero docker-compose.prod.yml, en caso contrario saltar este paso
<pre>
version: "1.1.1"

services:
  api:
    build: 
      context: ./
      dockerfile: Dockerfile.prod
    ports:
      - 9000:9000
      - 9001:9001
    volumes:
      - ./sco-web-server-backend/src:/app/src
      - ./nodeserver:/app/backend/dist/public/nodeserver
    depends_on:
      - db
  db:
    image: mongo:5.0.19-focal
    attach: false
    ports:
      - 27017:27017
    volumes:
      - sco-web-server:/data/db

volumes:
  sco-web-server:
</pre>

7- Crear la carpeta para el volumen de docker (Los ficheros del servidor de la máquina de docker se vinculará con esta carpeta)
<pre>
#La carpeta 'nodeserver' necesita perisos de escritura por Otros en el caso de linux

cd ..
mkdir ./sco-web-server/nodeserver
chmod -R 777 sco-web-server/
cd sco-web-server/

||

mkdir nodeserver
chmod -R 777 nodeserver
</pre>

8- Crear imagen del contenedor de docker
<pre>
docker compose -f docker-compose.prod.yml up --build
</pre>

9- Acceder a la aplicación
<pre>
http://yourhost:appPort
</pre>

10- Usuarios por defecto
<pre>
- admin // Admin123456!
- public // Public123456!
</pre>

# Funciones de la aplicación
- Visualizar el servidor (Redirección al index.html del servidor)
- Filtrar la ruta actual mediante input
- Filtrar por nombre mediante input
- Cambiar de vista
- Volver a la ruta raíz
- Actualizar ruta actual
- Subir de nivel
- Crear carpeta
- Subir archivos
- Descargar backup de todo el servidor
- Seleccionar archivos
  - Directorios se navegará y listará la nueva ruta
  - Archivos se abrirá en un enlace nuevo el archivo seleccionado
  - Archivos PDF se abriran en la propia aplicación
- Copiar
- Pegar
- Descargar
- Eliminar

# Copiar o Cortar ejemplo
- Al seleccionar un archivo con click izquierdo, se abrirá el panel de acciones
- En este panel estan las opciones descargar, copiar, cortar y eliminar
- Cuando se seleccione la opcion copiar / cortar, en el panel superior se activará el botón con el mismo icono de la opción, y permitirá pegar en la ruta actual
- Los botones superiores de pegar (Copia y Cortar), estarán deshabilitados siempre que no se seleccione la opción copiar o cortar del panel de acciones de un archivo

# Ejemplo
- http://scoapps.es:9000/#/node-server
- Public // Public123456!