> 简单介绍

* 一个炒鸡简单的快速搭建省市县三级联动node服务器的小插件
* 此插件采用JSONP接口，支持跨域请求
* 使用本插件需要配合相关数据库使用，数据库生成可使用`npm i province-city-county-linkage_mangodb`或者`git clone https://github.com/meatRoll/province-city-county-linkage_mangodb.git `下载数据库生成插件使用

> 使用步骤

##### 1. 修改相关配置项（server_config.json） 

* serverIP——服务器IP地址
* serverPort——服务器端口
* interfaces——服务器接口
  * province——省
  * city——市
  * county——县
* callbackFuncName——约定返回函数名
* mongodbUrl——数据库地址
* colections——数据库相关集合项
  * province——省
  * city——市
  * county——县
##### 2. 在本项目文件夹中使用`npm run server`指令启动服务器，如果看到控制台中成功输出`Server Start.`，则证明服务器正常启动。 

##### 3. 服务器接口说明：

> 以下接口名称皆可自定义，参数callback键名也可自定义

* province接口：
  * callback——回调函数名
* city接口：
  * provinceCode——省级行政区代号
  * callback——回调函数名
* county接口：
  * cityCode——地级行政区代号
  * callback——回调函数名

![](./images/meatroll.png)