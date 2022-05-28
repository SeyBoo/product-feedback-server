var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/feedback.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
});

router.get('/', function(req, res, next) {
   const search_field = req.query.feedback;
    const db_select = `SELECT * FROM comment INNER JOIN user ON comment.id_user=user.id WHERE id_product = ${search_field}
    ` 
    db.all(db_select, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.send(rows)
      }
    }); 
});

module.exports = router;