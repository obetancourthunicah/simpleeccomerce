var db = require('./db')();
var model = null;
function initModel(){
  db.run("CREATE TABLE IF NOT EXISTS categoriasproduct(id INTEGER PRIMARY KEY AUTOINCREMENT, categoryname TEXT, categorytype TEXT )");
  model = {};

  model.getAll = function (handler) {
    db.all("SELECT * from catgoriasproduct;",
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
    db.get("SELECT * from categoriasproductos where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

  model.addOne = function (categoryname,categorytype, handler) {
    db.run(
      "INSERT INTO categoriasproductos (categoryname,categorytype) VALUES (?, ?);",
      [categoryname,categorytype],
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

  model.updateOne = function (id,categoryname,categorytype, handler) {
    db.run(
      "UPDATE categoriasproductos set  categoryname = ?, categorytype =?  where id = ?;",
      [ categoryname,categorytype, id],
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
      "DELETE from categoriasproductos where id = ?;",
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