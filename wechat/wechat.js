'use strict'

var Promise =require('bluebird')
var request =Promise.promisify(require('request'))

var prifix='https://api.weixin.qq.com/cgi-bin/'
var api ={
    accessToken:prifix+'token?grant_type=client_credential',
    ticket:prifix+'ticket/getticket?'
}
function Wechat (opts){
    var _this=this
    this.appID=opts.appID
    this.appSecret=opts.appSecret
    this.getAccessToken =opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    this.getAccessToken()
    .then(function(data){
        try {
            data=JSON.stringify(data)
        } catch (e) {
            return _this.updateAccessToken(data)
        }
        if(_this.isValidAccessToken(data)){
            Promise.resolve(data)
        }else{
            return _this.updateAccessToken()
        }
    })
    .then(function(data){
        _this.access_token =data.access_token
        _this.expires_in=data.expires_in
        _this.saveAccessToken(data)
        // return Promise.resolve(data)
    })
}
Wechat.prototype.isValidAccessToken=function(data){
    if(!data || !data.access_token || !data.expires_in ){
        return false
    }
    var access_token=data.access_token
    var expires_in =data.expires_in
    var now =(new Date().getTime())
    if(now<expires_in){
        return true
    }else{
        return false
    }

}
Wechat.prototype.updateAccessToken=function(){
    var appID =this.appID
    var appSecret=this.appSecret
    var url =api.accessToken+'&appid='+appID +'&secret='+appSecret
    return new Promise (function(resolve,reject){
        request({url:url,json:true}).then(function(res){
            var data =res.body
            var now=(new Date().getTime())
            var expires_in =now +(data.expires_in -20)*1000
            data.expires_in = expires_in
            resolve(data)
        })
    })
    
}
module.exports = Wechat