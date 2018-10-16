'use strict'
const fs= require ('fs')
const Promise =require('bluebird')
exports.readFileAsync=function(fpath,encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,encoding,function(err,content){
            if(err) reject(err)
            else resolve(content)
        })
    })
}
exports.writeFileAsync=function(fpath,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(fpath,content,function(err){
            if(err) reject(err)
            else resolve()
        })
    })
}

exports.get_ip= function(ctx){
    let ip = ctx.request.get("X-Real-IP") || ctx.request.get("X-Forwarded-For") || ctx.request.ip
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip.replace(/::ffff:/g,'')
}