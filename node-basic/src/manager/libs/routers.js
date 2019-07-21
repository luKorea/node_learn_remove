// 路由表
let router = {};

const addRouter = (method, url, callback) => {
  method = method.toLowerCase();
  url = url.toLowerCase();
  router[method] = router[method] || {};
  router[method][url] = callback;
};

const findRouter = (method, url) => {
  method = method.toLowerCase();
  url = url.toLowerCase();
  if (!router[method] || !router[method][url]) {
    return null;
  } else {
    return router[method][url];
  }
};

module.exports = {
  addRouter,
  findRouter
};
