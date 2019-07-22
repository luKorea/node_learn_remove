const Router = require('koa-router');

const router = new Router();


router.get('home', async ctx => {
  ctx.body = '首页';
});

module.exports = router.routes();
