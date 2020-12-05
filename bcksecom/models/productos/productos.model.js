var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;

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

    async getFacet(page, items, search){
      try{
        const searchExp = "\\"+search+"\\";
        const filter = {"$or":[{"sku": searchExp }, {"name":searchExp} ]}
        let cursor = await this.collection.find(filter);
        let total = cursor.count();
        cursor.skip((page-1) * items);
        cursor.limit(items);
        let rslt = await cusor.toArray();
        return {total, rslt};
      }catch(ex){
        throw (ex);
      }
    }

    async getById(id){
      try{
        const _id = new ObjectID(id);
        let oneDoc = await this.collection.findOne({_id});
        return oneDoc;
      }catch(ex){
        throw(ex);
      }
    }
    async getByAttibutes(attributes){
      try{
        let docs = await this.collection.find(attributes).toArray();
        return docs;
      }catch(ex){
        throw(ex);
      }
    }
  // Proyecciones (conjunto especifico de datos del conjunto global)
  // SELECT _id, sku, name, price from productos;
  // {"_id":1,"sku":1, "name":1, "price":1}
  async getByAttibutesProjected(attributes, projection) {
    try {
      let docs = await this.collection.find(attributes).project(projection).toArray();
      return docs;
    } catch (ex) {
      throw (ex);
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

    async updateById(id, stock, sales){
      try{
        const _id = new ObjectID(id);
        // UPDATE TABLE SET attr = val, attr = val where attr = val;
        const updOps = {"$set":{"stock":stock, "sales":sales}};
        let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal:false});
        return updDoc;
      }catch(ex){
        throw(ex);
      }
    }

  async updateSales(id, stock, sales) {
    try {
      const _id = new ObjectID(id);
      // UPDATE TABLE SET attr = val, attr = val where attr = val;
      const updOps = { "$inc": { "stock": (stock*-1), "sales": sales } };
      let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal: false });
      return updDoc;
    } catch (ex) {
      throw (ex);
    }
  }

  async addCategory(id, category){
    try {
      let _category = category.toLowerCase();
      const UpdOps = {"$push": {categories: _category}};
      const _id = new ObjectID(id);
      let updDoc = await this.collection.findOneAndUpdate({ _id }, UpdOps, { returnOriginal: false});
      return updDoc;
    }catch(ex){
      throw(ex);
    }
  }

  async addCategorySet(id, category) {
    try {
      let _category = category.toLowerCase();
      const UpdOps = { "$addToSet": { categories: _category } };
      const _id = new ObjectID(id);
      let updDoc = await this.collection.findOneAndUpdate({ _id }, UpdOps, { returnOriginal: false });
      return updDoc;
    } catch (ex) {
      throw (ex);
    }
  }

    async removeById(id) {
      try{
        const _id = new ObjectID(id);
        let rslt = await this.collection.deleteOne({_id});
        return rslt;
      }catch(ex){
        throw(ex);
      }
    }
    
}
module.exports = ProductsModel;
