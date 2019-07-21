const config = require('./config');
const http = require('./libs/http');
const db = require('./libs/dataBase');
const {addRouter} = require('./libs/routers');


addRouter('get', '/list', async (res, get, post, files) => {
  try {
    let data = await db.query(`SELECT * FROM item_table`);
    res.writeJson({error: 0, data});
  } catch (e) {
    res.writeJson({error: 1, msg: 'database error'});
  }

  res.end();
});
addRouter('post', '/add', async (res, get, post, files) => {
  let {title, price, count} = post;

  if (!title || !price || !count) {
    res.writeJson({error: 1, msg: 'params invaild'});
    res.end();
  } else {
    price = Number(price);
    count = Number(count);

    if (isNaN(price) || isNaN(count)) {
      res.writeJson({error: 1, msg: 'params invaild'});
      res.end();
    } else {
      try {
        await db.query('INSERT INTO item_table (title, price, count) VALUES(?,?,?)', [title, price, count]);

        res.writeJson({error: 0, msg: 'success'});
      } catch (e) {
        res.writeJson({error: 1, msg: 'database error'});
      }
      res.end();
    }
  }
});
addRouter('get', '/del', async (res, get, post, files) => {

});
