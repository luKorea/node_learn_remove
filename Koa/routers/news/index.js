const Router = require('koa-router');

const list = require('./list');

let router = new Router();

router.get('/', async ctx => {
  console.log(ctx.params);
  ctx.body = list;
});

module.exports = router.routes();

