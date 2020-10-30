//Ocupamos un Driver monogdb
let MongoClient = require('mongodb').MongoClient;
let db = null;


module.exports = class MongoDBModel {
  static async getDb(){
    if(!db){
      try{
        let conn = await MongoClient.connect(process.env.MONGOURI, { useUnifiedTopology: true });
        db = conn.db(process.env.MONGODB);
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
