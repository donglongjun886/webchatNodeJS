const wechatApi = require('./api/wechatApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/wechat', wechatApi);

app.use(function(err, req, res, next) {
  console.warn('错误处理中间捕获Exception', err);
  res.send('内部错误');
});

app.listen(3000);
console.log('success listen at port: 3000')
