const environment = {
  name: 'prod',
  production: true,
  hostname: 'nodeserver.sco-techlab.es',
  port: '9000',
  apiPort: '9000',
  webSocketPort: '9001',
  globalPrefix: 'api',
  apiVersion: 'v1',
  httpsEnabled: true,
  apiUrl: '',
  serverSocketUrl: '',

  rootPath: '/root/sco-web-server/dist/public',
  serverFolder: 'nodeserver',
};

environment.apiUrl = `${environment.httpsEnabled ? 'https://' : 'http://'}`;
environment.apiUrl += `${environment.hostname}`;
environment.apiUrl += `:${environment.apiPort}/${environment.globalPrefix}/${environment.apiVersion}`;

environment.serverSocketUrl = `${environment.httpsEnabled ? 'wss://' : 'ws://'}`;
environment.serverSocketUrl += `${environment.hostname}:${environment.webSocketPort}`;

export default environment;