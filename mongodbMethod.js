'use strict';
// 引入mongodb
const MongoClient = require('mongodb').MongoClient;

// 解析设置文件
const config = require('./server_config.json');

// 保存数据库的地址
const url = config.mongodbUrl;

// 连接数据库并取得相关的集合，最后断开与数据库的连接
const connectToMangodb = (collectionName, callback) => {
	// 与数据库建立连接
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		// 得到数据集合
		const collection = db.collection(collectionName);
		// 执行各种操作
		callback(collection);
		// 断开与数据库的连接
		db.close();
	});
};

// 从数据库中查询数据
module.exports = (collectionName, params, callback) => {
	connectToMangodb(collectionName, (collection) => {
		// 查询数据
		collection.find(params).toArray((err, docs) => {
			if (err) throw err;
			// 调用事件处理程序
			callback(docs);
		});
	});
}