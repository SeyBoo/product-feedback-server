var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('./database/feedback.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

router.post('/', function(req, res, next) {
  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  
  const db_select = `INSERT INTO productRequest (title, category, description)
    VALUES("${title}", "${category}", "${description}");`
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
