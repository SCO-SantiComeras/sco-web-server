REM For script start, should run in a terminal in the same folder that the file: `init.bat`
echo Starting sco nodeserver application in production environment
pm2 delete sco-web-server;pm2 save --force;pm2 update;npm run pm2:start:prod;pm2 logs sco-web-server 
echo Finished sco nodeserver application launch in production environment