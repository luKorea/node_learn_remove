const Router = require('koa-router');

let router = new Router();

router.get('/money', async ctx=>{
  ctx.body = '企业资金';
});

module.exports = router.routes();
