var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('./database/feedback.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

router.post('/', function(req, res, next) {
  const product = req.body.product;
  const content = req.body.content;
  const user = req.body.user;
  
  const db_select = `INSERT INTO comment (id_product, content, id_user)
    VALUES("${product}", "${content}", "${user}");`
              db.all(db_select, [], (err, rows) => {
                if (err) {
                  return console.error(err.message);
                }
                else {
                  res.send(rows)
                }
              });
});

module.exports = router;
