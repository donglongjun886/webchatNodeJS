const wechatApi = require('./api/wechatApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use('/wechat', wechatApi);

app.listen(3000);
console.log('success listen at port: 3000')
