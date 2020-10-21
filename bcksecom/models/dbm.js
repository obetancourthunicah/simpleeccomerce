//Ocupamos un Driver monogdb
let MongoClient = require('mongodb').MongoClient;
let db = null;


module.exports = class MongoDBModel {
  static async getDb(){
    if(!db){
      try{
        let conn = await MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });
        db = conn.db("sw202003");
        return db;
      } catch(ex){
        console.log(ex);
        throw(ex);
        //process.exit(1);
      }
    } else {
      return db;
    }
  }
}
