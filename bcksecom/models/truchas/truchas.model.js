var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;

class ProductsModel {
  constructor() {
    this.collection = null
    MongoDB.getDb()
      .then(
        async (db) => {
          this.collection =  await db.collection("truchas");
          if (process.env.ENSURE_INDEX == "1") {
            await this.collection.createIndex({ "georef": "2dsphere" });
          }
        }
      )
      .catch((ex) => {
        throw (ex);
      });
  }

  async getAll( _id ) {
      try{
        const filter = {
          "usuario._id": ObjectID(_id)
        };
        let cursor = await this.collection.find(filter);
        let truchas = await cursor.sort(["nombre"], 1).toArray();
        return truchas;
      }catch(ex){
        throw(ex);
      }
  }

  async getNear( _id, longitud, latitud, meters){
      try {
        const filter = {
          "usuario._id": ObjectID(_id),
          georef: {
            "$near": {
              "$geometry": {
                "type": "Point",
                coordinates: [longitud, latitud]
              },
              $maxDistance: meters
            }
          }
        };
        let cursor = await this.collection.find(filter);
        let truchas = await cursor.toArray();
        return truchas;
      } catch (ex) {
        throw (ex);
      }
  }

  async new (_id, email, longitud, latitud, tags, nombre){
    try{
      let newTrucha = {
        usuario:{
          _id:ObjectID(_id),
          email
        },
        georef: {
          "type": "Point", coordinates: [longitud, latitud]
        },
        tags,
        nombre,
        estado: "ACT"
      };
      let rlst = await this.collection.insertOne(newTrucha);
      return rlst;
    } catch(ex){
      throw(ex);
    }
  }
}
/*

{
  usuario: {
    _id:
    email:
  },
  georef : {
     type: "Point", coordinates: [ longitud, latitud ]
  },
  tags: [],
  nombre: "",
  estado: "ACT"
}

 */

module.exports = ProductsModel;
