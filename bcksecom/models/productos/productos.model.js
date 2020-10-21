var MongoDB = require('../dbm');

class ProductsModel{
    constructor(){
      this.collection = null
      MongoDB.getDb()
       .then (
         (db)=>{
           this.collection = db.collection("poductos");
         }
      )
       .catch((ex)=>{
        throw(ex);
      });
    }

    async getAll(){
      try {
        let rslts = await this.collection.find({}).toArray();
        return rslts;
      }catch(ex){
        throw(ex);
      }
    }

    async addOne( document ) {
      try{
        var result = await this.collection.insertOne(document);
        return result;
      }catch(ex){
        throw(ex);
      }
    }
}
module.exports = ProductsModel;
