'use strict'
const fs = require('fs')
const Promise = require('bluebird')
const crypto = require('crypto')
const md5 = (str, encoding = 'utf8') => crypto.createHash('md5').update(str, encoding).digest('hex');
const sha256 = (str, key, encoding = 'utf8') => crypto.createHmac('sha256', key).update(str, encoding).digest('hex');
const secret =''
const toQueryString = (obj) => Object.keys(obj)
    .filter(key => key !== 'sign' && obj[key] !== undefined && obj[key] !== '')
    .sort()
    .map(key => key + '=' + obj[key])
    .join('&');

exports.readFileAsync = function (fpath, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, encoding, function (err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}
exports.writeFileAsync = function (fpath, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, content, function (err) {
            if (err) reject(err)
            else resolve()
        })
    })
}

exports.get_ip = function (ctx) {
    let ip = ctx.request.get("X-Real-IP") || ctx.request.get("X-Forwarded-For") || ctx.request.ip
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip.replace(/::ffff:/g, '')
}

exports.getSign = function (params, type = 'MD5') {
    let str = secret + toQueryString(params) + secret;
    switch (type) {
        case 'MD5':
            return md5(str).toUpperCase();
            break;
        case 'HMAC-SHA256':
            return sha256(str, this.partnerKey).toUpperCase();
            break;
        default:
            throw new Error('signType Error');
    }
}

exports.toQueryString = toQueryString
exports.md5 = md5
exports.sha256 = sha256