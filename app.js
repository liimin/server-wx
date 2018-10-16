const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const index = require('./routes/index')
const secret = require('./config/secret')
const err = require('./middlreware/error')
const path = require('path')
const util = require('./util/util')

const wechat = require('./wechat/g')
const wechat_file = path.join(__dirname, './config/wechat.txt')
var config = {
    wechat: {
        appID: 'wxd602cfb35118a94b',
        appSecret: '36852f01d737b09f526effdf9bf04d6a',
        token: 'templeVAYNFc3ITJOd8MjyUNXyQiO321',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

// error handler
onerror(app)
app.use(err())
app.use(cors());
// 过滤不用jwt验证
app.use(jwt({
    secret: secret.sign
}).unless({
    path: [
        // 注册接口
        /^\/api\/v1\/user\/register/,
        // 登录接口
        /^\/api\/v1\/admin\/login/,
        // 点灯
        /^\/api\/v1\/temple\/lighton/,
        // 支付
        /^\/api\/v1\/temple\/payment/,
        /^\/api\/v1\/blessions\/list/,
        /^\/api\/v1\/temples\/list/,
        /^\/api\/v1\/temple\/wx\/sign/,
        /^\/api\/v1\/temples\/add/,
        /^\//,
    ]
}))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
        text: ['text/xml', 'application/xml']
    }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// routes
app.use(index.routes(), index.allowedMethods())
// app.use(wechat(config.wechat))
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
// app.use(wechat(config.wechat))
module.exports = app