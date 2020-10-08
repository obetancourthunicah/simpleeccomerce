// {{host}}/api/categorias/
const express = require("express");
let router = express.Router();

/**
 * Rutas para manejar la entidad de categorias del API
 * @author Orlando J Betancourth
 * @date 2020-10-07
 *
 * @namespace api/categorias
 *
 */

let categoriaModel = require('../../models/categorias.model')();

/**
 * Descripcion de lo que hace
 * @memberof api/categorias
 * @method all
 *
 * @returns {json} El retorno
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

/**
 * Descripcion de lo que hace
 * @memberof api/categorias
 * @method ObtenerUno
 * @params {String} id
 * @returns {json} El retorno
 */
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

/**
 * Descripcion de lo que hace
 * @memberof api/categorias
 * @method AgregarUno
 * 
 * @returns {json} El retorno
 */
router.post('/new', (req, res)=>{
  const { category, type } = req.body;
  categoriaModel.addOne(category, type, (err, inserted)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json({ inserted });
  });
});

/**
 * Descripcion de lo que hace
 * @memberof api/categorias
 * @method ActualizarUno
 * 
 * @returns {json} El retorno
 */
router.put('/upd/:id', (req, res)=>{
  //do something here
  let {id} = req.params;
  id = Number(id);
  let {category, type} = req.body;
  categoriaModel.updateOne( id, category, type, (err, updated)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json({ updated });
  });
});

/**
 * Descripcion de lo que hace
 * @memberof api/categorias
 * @method BorrarUno
 * 
 * @returns {json} El retorno
 */
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
