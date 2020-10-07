const express = require('express');
const router = express.Router();

/**
 * Router Principal para el api de SECOM
 *
 * @author Orlando J Betancourth
 * @date 2020-10-05
 * @namespace api
 */

//¿ Para qué necesito router ?
//  Es el mecanismo que me permite registrar rutas y controladores
// (handlers) para el servidor web.

//Configuar las rutas en router

// Metodos de registro de router son:
// get -- consulta  -- select
// post -- crear recursos -- insert
// put -- actualizar un recurso -- update
// delete -- borrar un recurso -- delete
// ------------------------------------------
//  dos parámetros
//  1) path: constante (texto) de la ruta  -- toda ruta debe empezar con /
//  2) handler: function ( req, res, next ) { }
//                req: es información que se recibe de la petición
//                res: es la informacion que se enviara al solicitante.
//               next: es un metodos para llamar a la siguiente promesa en la cola
//                     MIDDLEWARES

const productosRoutes = require('./api/productosdb');
const categoriasRoutes = require('./api/categoriasdb');
/**
 * Ruta que permite revisar la versión vigente de el API
 * @method version
 * @memberof api
 * 
 * @returns Objeto JSON con los datos generales del API
 */
router.get('/version', (req, res)=>{
  //var, let, const
  let versionObj = {
    app:"Simple Eccomerce SECOM API",
    version: "0.0.0.1",
    state:"alpha"
  }
  res.status(200).json(versionObj);
});

router.use('/productos', productosRoutes);
router.use('/categorias',categoriasRoutes);
/**
 * Ruta que permite modificar un elemento de Productos
 * @method update
 * @memberof api
 *
 * @param {string} id identificador del registro (params)
 * @param {string} edad Edad a actualizar en el registro (body)
 *
 * @returns {json} Resumen de la Edad modificada en el registro.
 */
router.put('/update/:id', (req, res)=>{
  let { id } = req.params;
  id = Number(id);
  let { edad } = req.body;

  res.status(200).json({id, edad});
});

router.delete('/delete/:id', (req, res)=>{
  let { id } = req.params;
  id = Number(id);
  res.status(200).json({id});
});


module.exports = router;
