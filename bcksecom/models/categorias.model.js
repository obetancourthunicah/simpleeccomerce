var db = require('./db')();
var model = null;
function initModel() {
    db.run("CREATE TABLE IF NOT EXISTS categoria(id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT,type TEXT)");
    model = {};

    model.getAll = function (handler) {
        db.all("SELECT * from categoria;",
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
        db.get("SELECT * from categoria where id = ?;", [id],
            function (err, row) {
                if (err) {
                    return handler(err, null);
                } else {
                    return handler(null, row || {});
                }
            }
        )
    }
    model.addOne = function (category, type, handler) {
        db.run(
            "INSERT INTO categoria (category,type) VALUES (?, ?);",
            [category, type],
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
    model.updateOne = function (id, category, type, handler) {
        db.run(
            "UPDATE categoria set  category = ?, type = ? where id = ?;",
            [category, type, id],
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
            "DELETE from categoria where id = ?;",
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