var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/feedback.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
});

router.get('/', function(req, res, next) {
    const search_list = ['all','ui','ux','enhancement','bug','feature']
    var search_field = req.query.category;
    const feedback_field = req.query.feedback;
    if (search_field != null) {
      search_list.forEach(element => {
        if (element === search_field) {
          if (search_field === "all") {
            const db_select = `SELECT * FROM productRequest`
              db.all(db_select, [], (err, rows) => {
                if (err) {
                  return console.error(err.message);
                }
                res.send(rows)
              }); 
          } else {
            if (search_field === 'ux') {
              search_field = search_field.toUpperCase()
            } else if (search_field === 'ui') {
              search_field = search_field.toUpperCase() 
            }
            else {
              search_field = search_field.charAt(0).toUpperCase() + search_field.slice(1)
            }
            console.log(search_field)
            const db_select = `SELECT * FROM productRequest WHERE category = '${search_field}'`
            db.all(db_select, [], (err, rows) => {
              if (err) {
                return console.error(err.message);
              }
              if (rows.length < 1) {
                res.send({"error":"Table doesn't contain anything"})
              } else {
                res.send(rows)
              }
            });
          } 
        }
        
      });
    }
    if (feedback_field != null) {
      const db_select = `SELECT * FROM productRequest WHERE id IN ('${feedback_field}')`
      db.all(db_select, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }
        if (rows.length < 1) {
          res.send({"error":"Table doesn't contain anything"})
        } else {
          res.send(rows)
        }
      });
    }
});

module.exports = router;


/*const db_select = `SELECT * FROM productRequest WHERE category IN ('${search_field}')`
            db.all(db_select, [], (err, rows) => {
              if (err) {
                return console.error(err.message);
              }
              if (rows.length < 1) {
                res.send({"error":"Table doesn't contain anything"})
              } else {
                res.send(rows)
              }
            });  */