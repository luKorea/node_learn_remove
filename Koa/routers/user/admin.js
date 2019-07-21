const Router = require('koa-router');

let router = new Router();

router.get('/profile', async ctx=>{
  ctx.body = '管理员档案';
});

module.exports = router.routes();
