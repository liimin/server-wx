const Router = require('koa-router')
// const UserController = require('../controllers/user')
// const ArticleController = require('../controllers/article')
const TempleController = require('../controllers/temple')
const TemplesController = require('../controllers/temples')
const AdminController = require('../controllers/admin')
const router = new Router({
    prefix: '/api/v1'
})
/**
 * 用户接口
 */
// 用户注册
// router.post('/user/register', UserController.create);
// 用户登录
// router.post('/user/login', UserController.login);
// 删除用户
// router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
// router.get('/user/info', UserController.getUserInfo);
// 获取用户列表
// router.get('/user/list', UserController.getUserList);

/**
 * 文章接口
 */
// 创建文章
// router.post('/article/create', ArticleController.create);
// 获取文章详情
// router.get('/article/detail/:id', ArticleController.detail);
// 删除文章
// router.delete('/article/delete/:id', ArticleController.delete);
// 更改文章
// router.put('/article/update/:id', ArticleController.update);
// 获取文章列表
// router.get('/article/list', ArticleController.getArticleList);

// 获取寺观列表
router.get('/temples/list', TemplesController.getTempleList);
// 获取寺观详情
router.get('/temple/detail', TempleController.getTempleDetail);
// 新增寺观
router.post('/temples/add', TemplesController.addTemple);
// 获取祝福语列表
router.get('/blessions/list', TempleController.getBlessionsList);
// 获取微信配置
router.get('/temple/wx/sign', TempleController.getSignature);
// 点灯
router.post('/temple/lighton', TempleController.lightOn);
// 关灯
router.post('/temple/lightoff', TempleController.lightOff);

// 登录
router.post('/admin/login', AdminController.login);

// 静态资源服务器
router.get('/static', async (ctx) => {
    // 静态资源目录在本地的绝对路径
    let fullStaticPath = path.join(__dirname, '../')
  
    // 获取静态资源内容，有可能是文件内容，目录，或404
    let _content = await staticUtil.content(ctx, fullStaticPath)
  
    // 解析请求内容的类型
    let _mime = staticUtil.parseMime(ctx.url)
  
    // 如果有对应的文件类型，就配置上下文的类型
    if (_mime) {
      ctx.type = _mime
    }
  
    // 输出静态资源内容
    if (_mime && _mime.indexOf('image/') >= 0) {
      // 如果是图片，则用node原生res，输出二进制数据
      ctx.res.writeHead(200)
      ctx.res.write(_content, 'binary')
      ctx.res.end()
    } else {
      // 其他则输出文本
      ctx.body = _content
    }
  })
module.exports = router
