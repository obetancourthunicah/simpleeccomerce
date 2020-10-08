// {{host}}/api/categorias/
const express = require("express");
let router = express.Router();

/**
 * Rutas para manejar la entidad de categorias del API
 * @author Christian Rapalo
 * @author Samuel Rodriguez
 * @author Hector Morales
 * @author Omar Sanabria
 * @author Edgar Portillo
 * @date 2020-10-07
 *
 * @namespace api/categorias
 *
 */

let categoriaModel = require('../../models/categorias.model')();

/**
 * Obtiene todos los registros guardados en el almacen de categorias
 * @memberof api/categorias
 * @method all
 *
 * @returns {json} todas las categorias
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
 * Obtiene un registro en base al id 
 * @memberof api/categorias
 * @method ObtenerUno
 * @param {String} id
 * @returns {json} La categoria
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
 * Agrega una nueva categoria
 * @memberof api/categorias
 * @method AgregarUno
 * @param {String} id
 * @param {String} category
 * @param {String} type
 * @returns {json} Retorna valor booleano indicando si la operación fue exitosa o no
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
 * Modifica una categoria en base al id
 * @memberof api/categorias
 * @method ActualizarUno
 * @param {String} id
 * @param {String} category
 * @param {String} type
 * @returns {json} Retorna valor booleano indicando si la operación fue exitosa o no
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
 * Elimina una categoria
 * @memberof api/categorias
 * @method BorrarUno
 * @param {String} id
 * @returns {json} Retorna valor booleano indicando si la operación fue exitosa o no
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
