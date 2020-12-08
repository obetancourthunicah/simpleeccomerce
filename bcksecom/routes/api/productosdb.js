// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

/**
 * Rutas para manejar la entidad de productos del API
 * @author Orlando J Betancourth
 * @date 2020-10-05
 *
 * @namespace api/productos
 *
 */

let productModel = require('../../models/productos.model')();

const ProductModelClass = require('../../models/productos/productos.model');
const mdbProductModel = new ProductModelClass();
/**
 * Obtiene todos los registros guardados en el almacen de productos
 * @memberof api/productos
 * @method all
 *
 * @returns {json} Todos los registros almacenados en el almacén de productos
*/
router.get('/all', async (req, res)=>{
  try{
    const rslt = await mdbProductModel.getAll()
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({"msg":"Algo Paso Mal."});
  }
  // productModel.getAll( (err, rslts)=>{
  //   if (err){
  //     console.log(err);
  //     return res.status(503).json({"error":"Algo salio mal."});
  //   }
  //   return res.status(200).json(rslts);
  // });
});

router.get('/facet/:page/:items', async (req, res) => {
  try {
    const {page, items} = req.params;
    const rslt = await mdbProductModel.getFacet(Number(page), Number(items), '');
    res.status(200).json(rslt);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.get('/facet/:page/:items/:search', async (req, res) => {
  try {
    const { page, items, search } = req.params;
    const rslt = await mdbProductModel.getFacet(Number(page), Number(items), search);
    res.status(200).json(rslt);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbProductModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
  // productModel.getOne( id, (err, rslts)=>{
  //   if (err) {
  //     console.log(err);
  //     return res.status(503).json({ "error": "Algo salio mal." });
  //   }
  //   return res.status(200).json(rslts);
  // });
});

router.get('/sku/:skuid', async(req, res)=>{
  try{
    const { skuid } = req.params;
    let rsltset = await mdbProductModel.getByAttibutes({sku: skuid});
    res.status(200).json(rsltset);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});// get sku/:skuid

router.get('/stock/:stock', async (req, res) => {
  try {
    let { stock } = req.params;
    stock = Number(stock);
    // $gte == greater than or equal  | where stock >= 250
    let rsltset = await mdbProductModel.getByAttibutes({ stock: {"$gte": stock} });
    res.status(200).json(rsltset);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});// get sku/:skuid



router.get('/rstock/:stock', async (req, res) => {
  try {
    let { stock } = req.params;
    stock = Number(stock);
    // $gte == greater than or equal | where stock >= 250
    // $lte == less than or equal  | where stock <= 250
    // $lt = less than  | where stock  < 250
    // $gt = greater than | where stock > 250
    // $ne = not equal to | where stock <> 250

    //timestamp // Cantidad de Segundos Transcurridos desde el EPOC
    //EPOC = 1970-01-01 00:00:00
    // Rango de Fechas | between tm1 and tm2 | fecha >= tm1 and fecha <= tm2

    let rsltset = await mdbProductModel.getByAttibutes({ stock: { "$lte": stock } });
    res.status(200).json(rsltset);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});// get sku/:skuid


router.get('/stockrange/:stock1/:stock2', async (req, res) => {
  try {
    let { stock1, stock2 } = req.params;
    stock1 = Number(stock1);
    stock2 = Number(stock2);
    // Busqueda por rango || and 
    let rsltset = await mdbProductModel.getByAttibutes({ stock: { "$gte": stock1, "$lte": stock2 } });
    res.status(200).json(rsltset);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});// get sku/:skuid


router.get('/categories/byname/:category', async (req, res) => {
  try {
    let { category } = req.params;
    category = category.toLowerCase();
    let rsltset = await mdbProductModel.getByAttibutesProjected({categories: category}, {"sku":1, "name":1,"price":1});
    res.status(200).json(rsltset);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});// get sku/:skuid


router.get('/top', (req, res)=>{
  productModel.getTopTen( (err, productos)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json(productos);
  }
  );
});

router.post('/new', async (req, res)=>{
  try{
    let { sku, name, price, stock=0} = req.body;
    price = Number(price);
    stock = Number(stock);
    var rslt = await mdbProductModel.addOne({ sku, name, price, stock}); // {sku: sku, name:name, price:price, stock:0}
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
  // productModel.addOne(sku, name, price, stock, (err, inserted)=>{
  //   if (err) {
  //     console.log(err);
  //     return res.status(503).json({ "error": "Algo salio mal." });
  //   }
  //   return res.status(200).json({ inserted });
  // });
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let {stock, sales} = req.body;
    sales = Number(sales);
    stock = Number(stock);
    let rslt = await mdbProductModel.updateById(id, stock, sales);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});
  router.put('/sales/:id', async (req, res) => {
    try {
      let { id } = req.params;
      let { stock, sales } = req.body;
      sales = Number(sales);
      stock = Number(stock);
      let rslt = await mdbProductModel.updateSales(id, stock, sales);
      res.status(200).json(rslt);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  // productModel.updateOne( id, stock, sales, (err, updated)=>{
  //   if (err) {
  //     console.log(err);
  //     return res.status(503).json({ "error": "Algo salio mal." });
  //   }
  //   return res.status(200).json({ updated });
  // });
});

router.put('/category/add/:id', async (req, res) => {
  try {
    let { id } = req.params;
    //id = Number(id);
    let { category } = req.body;
    let rslt = await mdbProductModel.addCategorySet(id, category);
    res.status(200).json(rslt);
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.delete('/del/:id',async (req, res)=>{
  let {id} = req.params;
  try{
    let rslt = await mdbProductModel.removeById(id);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
  
  // productModel.deleteOne(id, (err, deleted)=>{
  //   if (err) {
  //     console.log(err);
  //     return res.status(503).json({ "error": "Algo salio mal." });
  //   }
  //   return res.status(200).json({ deleted });
  // });
});

module.exports = router;
