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

/**
 * Obtiene todos los registros guardados en el almacen de productos
 * @memberof api/productos
 * @method all
 *
 * @returns {json} Todos los registros almacenados en el almacén de productos
*/
router.get('/all', (req, res)=>{
  productModel.getAll( (err, rslts)=>{
    if (err){
      console.log(err);
      return res.status(503).json({"error":"Algo salio mal."});
    }
    return res.status(200).json(rslts);
  });
});

router.get('/byCat',(req,res)=>{
    let {typec} = req.body;
    productModel.getPrdByCat(typec,(err,rslt)=>{
      if (err){
        console.log(err);
        return res.status(503).json({"error":"Algo salio mal."});
      }
      return res.status(200).json(rslt);
    });
});
router.get('/byTwoCat',(req,res)=>{
  let {type1,type2} = req.body;
  productModel.GetPrdByTwo(type1,type2,(err,rslt)=>{
    if (err){
      console.log(err);
      return res.status(503).json({"error":"Algo salio mal."});
    }
    return res.status(200).json(rslt);
  });
});

router.get('/one/:id', (req, res)=>{
  let { id } = req.params;
  id = Number(id);
  productModel.getOne( id, (err, rslts)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json(rslts);
  });
});

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

router.post('/new', (req, res)=>{
  const { sku, name, price, stock=0,type} = req.body;
  productModel.addOne(sku, name, price, stock,type, (err, inserted)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json({ inserted });
  });
});

router.put('/upd/:id', (req, res)=>{
  //do something here
  let {id} = req.params;
  id = Number(id);
  let {stock, sales} = req.body;
  sales = Number(sales);
  stock = Number(stock);
  productModel.updateOne( id, stock, sales, (err, updated)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json({ updated });
  });
});

router.delete('/del/:id', (req, res)=>{
  let {id} = req.params;
  id = Number(id);
  productModel.deleteOne(id, (err, deleted)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json({ deleted });
  });
});

module.exports = router;
