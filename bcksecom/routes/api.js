const express = require('express');
const router = express.Router();

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

router.get('/version', (req, res)=>{
  let versionObj = {
    app:"Simple Eccomerce SECOM API",
    version: "0.0.0.1",
    state:"alpha"
  }
  res.status(200).json(versionObj);
});

router.use('/productos', productosRoutes);

/*
router.get('/param/:edad', (req, res)=>{
  var edad = parseInt(req.params.edad);
  res.status(200).json({"edad":edad});
});

router.post('/new', (req, res)=>{
  // $_POST datos del formulaio http
  //let msg = req.body.msg ;
  //let otro = req.body.otro || null;
  //es6 destructring
  let { msg, otro } = req.body;

  res.status(200).json({"mensaje":msg, "otro": otro});

});//new

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
*/
module.exports = router;
