'use strict'
var sha1 = require('sha1')
const getRawBody = require('raw-body')
const Wechat= require('./wechat')

module.exports=function(opts){
    console.log(opts)
    var wechat =new Wechat(opts)
    return function *(req,next){
        var token =opts.token
        var signature = this.query.signature
        var nonce=this.query.nonce
        var timestamp=this.query.timestamp
        var echostr=this.query.echostr
        var str =[token,timestamp,nonce].sort().join('')
        var sha = sha1(str)
        if(this.method ==='GET'){
            if(sha === signature){
                this.body=echostr+''
            }else{
                this.body='wrong'
            }
        }else if(this.method ==='POST'){
            if(sha !== signature){
                this.body='wrong'
                return false
            }
            console.log(11111111)
            try {
                var data = yield getRawBody(req,{
                    length: this.length,
                    limit:'1mb',
                    encoding:this.charset
                })
            } catch (error) {
                console.log(error)
            }
            

            // console.log(data.toString())
        }
    }
}