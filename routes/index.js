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

module.exports = router
