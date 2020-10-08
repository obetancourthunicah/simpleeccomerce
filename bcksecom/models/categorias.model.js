var db = require('./db')();
var model = null;
function initModel(){
<<<<<<< HEAD
  db.run("CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, type TEXT)");
  model = {};

  model.getAll = function (handler) {
    db.all("SELECT * from categorias;",
=======
  db.run("CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, sku TEXTO, name TEXTO, price NUMERIC, stock INTEGER, sales INTEGER )");
  model = {};

  model.getAll = function (handler) {
    db.all("SELECT * from productos;",
>>>>>>> 6dfcb070ff8b4614f92fe0a9ea380db6b1d2693d
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
<<<<<<< HEAD
    db.get("SELECT * from categorias where id = ?;", [id],
=======
    db.get("SELECT * from productos where id = ?;", [id],
>>>>>>> 6dfcb070ff8b4614f92fe0a9ea380db6b1d2693d
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

<<<<<<< HEAD
  model.addOne = function (category, type) {
    db.run(
      "INSERT INTO categorias (category, type) VALUES (?, ?, ?, ?, 0);",
      [category, type],
=======
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
>>>>>>> 6dfcb070ff8b4614f92fe0a9ea380db6b1d2693d
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

<<<<<<< HEAD
  model.updateOne = function (category, type, handler) {
    db.run(
      "UPDATE categorias set  category = ?, type = ? where id = ?;",
      [category, type, id],
=======
  model.updateOne = function (id, stock, sales, handler) {
    db.run(
      "UPDATE productos set  stock = ? , sales = sales + ? where id = ?;",
      [ stock, sales, id],
>>>>>>> 6dfcb070ff8b4614f92fe0a9ea380db6b1d2693d
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
<<<<<<< HEAD
      "DELETE from categorias where id = ?;",
=======
      "DELETE from productos where id = ?;",
>>>>>>> 6dfcb070ff8b4614f92fe0a9ea380db6b1d2693d
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 6dfcb070ff8b4614f92fe0a9ea380db6b1d2693d
