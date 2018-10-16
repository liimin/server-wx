const Router = require('koa-router')
const TempleController = require('../controllers/temple')
const TemplesController = require('../controllers/temples')
const AdminController = require('../controllers/admin')



const router = new Router({
    // prefix: '/api/v1'
})

// 获取寺观列表
router.get('/temples/list', TemplesController.getTempleList);
// 获取寺观详情
router.get('/temple/detail', TempleController.getTempleDetail);
// 新增寺观
router.post('/temples/add', TemplesController.addTemple);
// 获取祝福语列表
router.get('/blessions/list', TempleController.getBlessionsList);
// 获取微信openid
router.get('/temple/wx/sign', TempleController.getWXOpenId);
// 点灯
router.post('/temple/lighton', TempleController.lightOn);
// 关灯
router.post('/temple/lightoff', TempleController.lightOff);

// 登录
router.post('/admin/login', AdminController.login);

// 静态资源服务器
router.get('/', TempleController.access_token)
module.exports = router
