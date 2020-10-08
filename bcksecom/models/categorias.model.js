var db = require('./db')();
var model = null;
function initModel(){
  db.run("CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, sku TEXTO, name TEXT, price NUMERIC, stock INTEGER, sales INTEGER )");
  model = {};

  model.getAll = function (handler) {
    db.all("SELECT * from productos;",
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, rows);
        }
      }
    )
  }

  model.getOne = function (id, handler) {
    db.get("SELECT * from productos where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

  model.getTopTen = function ( handler) {
    db.all("SELECT * from productos order by sales desc limit 10;", [],
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, rows || []);
        }
      }
    )
  }


  model.addOne = function (sku, name, price, stock, handler) {
    db.run(
      "INSERT INTO productos (sku, name, price, stock, sales) VALUES (?, ?, ?, ?, 0);",
      [sku, name, price, stock],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.updateOne = function (id, stock, sales, handler) {
    db.run(
      "UPDATE productos set  stock = ? , sales = sales + ? where id = ?;",
      [ stock, sales, id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.deleteOne = function (id, handler) {
    db.run(
      "DELETE from productos where id = ?;",
      [id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  return model;
}

module.exports = function () {
  if (!model) {
    return initModel();
  } else {
    return model;
  }
}
