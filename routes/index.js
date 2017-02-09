var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var config = require('../config')

//接入wx,
router.get('/', function(req, res, next) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;

    var array = new Array(config.token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");

     //将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");

     //开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code===signature){
        res.send(echostr)
    }else{
        res.send("error");
    }
});

//接收数据，但是要按微信的格式拼接成xml格式的数据，就直接采用wechat
router.post('/', function (req, res, next) {

})


module.exports = router;
