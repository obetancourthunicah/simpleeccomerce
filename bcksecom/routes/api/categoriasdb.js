
const express = require("express");
let router = express.Router();

let categoriaModel = require('../../models/categorias.models')();

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
