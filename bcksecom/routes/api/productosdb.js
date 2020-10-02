// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

let productModel = require('../../models/productos.model')();

router.get('/all', (req, res)=>{
  productModel.getAll( (err, rslts)=>{
    if (err){
      console.log(err);
      return res.status(503).json({"error":"Algo salio mal."});
    }
    return res.status(200).json(rslts);
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

router.post('/new', (req, res)=>{
  const { sku, name, price, stock=0} = req.body;
  productModel.addOne(sku, name, price, stock, (err, inserted)=>{
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
  let {stock} = req.body;
  stock = Number(stock);
  productModel.updateOne( id, stock, (err, updated)=>{
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
