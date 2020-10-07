// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

/**
 * Rutas para manejar la entidad de productos del API
 * @author Grupo 6
 * @date 2020-10-05
 *
 * @namespace api/productos
 *
 */

let categoriaModel = require('../../models/categorias.model')();

/**
 * Obtiene todos los registros guardados en la tabla categoria
 * @memberof api/productos
 * @method all
 *
 * @returns {json} Todos los registros almacenados en la tabla categoria
*/
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
  const {category,type} = req.body;
  categoriaModel.addOne(category,type, (err, inserted)=>{
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
  let {category,type} = req.body;
  productModel.updateOne( id,category,type, (err, updated)=>{
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
