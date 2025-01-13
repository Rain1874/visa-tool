const path = require('path');
const fs = require('fs');
const os = require('os');
const compression = require('compression');
const express = require('express');

const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const ejs = require('ejs');
const env = process.env.npm_package_config_env || 'prod';
const proxy = require(`../proxy/proxy.prod.js`);
const indexRouter = require('./indexRouter');

app.use(compression());

// 模板配置
// eslint-disable-next-line no-underscore-dangle
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../dist'));

// 静态资源配置
app.use('/', express.static(path.join(__dirname, '../dist')));

// api代理配置
app.use('/api', createProxyMiddleware(proxy.proProxy['/api']));

// 路由配置
app.use('*', indexRouter);

// 监听端口
app.listen(proxy.port);
const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces)
  .map((key) => networkInterfaces[key].filter((item) => item.family === 'IPv4'))
  .forEach((ips) => {
    if (!ips[0]) {
      return;
    }
    console.log(`APP running at http://${ips[0].address}:${proxy.port}`);
  });
