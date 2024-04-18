# For script start, should run in a terminal in the same folder that the file: `./stop.sh`
echo "Stopping sco nodeserver application in production environment"
pm2 delete sco-web-server;pm2 save --force;pm2 update 
echo "Finished sco nodeserver application stopping in production environment"