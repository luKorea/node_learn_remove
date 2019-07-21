const Router = require('koa-router');

let router = new Router();

router.get('/', async ctx => {
 /* if (!ctx.query.username || !ctx.query.password) {
    ctx.throw(400, 'username or password is required')
  } else {
    console.log(ctx.query);
    ctx.body = '登录成功'
  }*/
 // 断言测试
 ctx.assert(ctx.query.username, '用户名不能为空', 400);
 ctx.assert(ctx.query.password, '密码不能为空', 400);
 if (ctx.query.username && ctx.query.password) {
   ctx.redirect('/user');
 }


});

module.exports = router.routes();
