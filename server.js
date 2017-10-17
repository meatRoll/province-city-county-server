'use strict';
// 导包
const express = require('express');
const findMethod = require('./mongodbMethod.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 解析设置文件
const config = require('./server_config.json');
const callbackFuncName = config.callbackFuncName;

// 生成app
const app = express();


// 使用session
app.use(cookieParser());
app.use(session({
	secret: 'mine'
}));

// 采用jsonp处理跨域
app.get(config.interfaces.province, (req, res) => {
	const callback = req.query[callbackFuncName];
	findMethod(config.colections.province, null, docs => {
		for (let i = 0, len = docs.length; i < len; i++) delete docs[i]._id;
		res.set('Content-Type', 'application/javascript');
		res.send(`${callback}(${JSON.stringify(docs)})`);
	});
});

app.get(config.interfaces.city, (req, res) => {
	const callback = req.query[callbackFuncName];
	const provinceCode = Number(req.query.provinceCode);
	findMethod(config.colections.city, {
		"provinceCode": provinceCode
	}, docs => {
		for (let i = 0, len = docs.length; i < len; i++) delete docs[i]._id;
		res.set('Content-Type', 'application/javascript');
		res.send(`${callback}(${JSON.stringify(docs)})`);
	});
});

app.get(config.interfaces.county, (req, res) => {
	const callback = req.query[callbackFuncName];
	const cityCode = Number(req.query.cityCode);
	findMethod(config.colections.county, {
		"cityCode": cityCode
	}, docs => {
		for (let i = 0, len = docs.length; i < len; i++) delete docs[i]._id;
		res.set('Content-Type', 'application/javascript');
		res.send(`${callback}(${JSON.stringify(docs)})`);
	});
});

// 监听端口
app.listen(config.serverPort, config.serverIP, () => {
	console.log('Server Start.');
});