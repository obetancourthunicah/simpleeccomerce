const express = require("express");
let router = express.Router();

let categoriaModel = require('../../models/categorias.model')();

router.get('/all', (req, res)=>{
  categoriaModel.getAll( (err, rslts)=>{
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
  categoriaModel.getOne( id, (err, rslts)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json(rslts);
  });
});

router.post('/new', (req, res)=>{
  const { categoryname,categorytype, stock=0} = req.body;
  categoriaModel.addOne(categoryname,categorytype, (err, inserted)=>{
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
  let {categoryname} = req.body;
  let {categorytype} = req.body;
  stock = Number(stock);
  categoriaModel.updateOne( id, categoryname,categorytype, (err, updated)=>{
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
  categoriaModel.deleteOne(id, (err, deleted)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json({ deleted });
  });
});

module.exports = router;