const express = require('express');
let router = express.Router();

let TruchasModel = require("../../models/truchas/truchas.model");
let TrchMdl = new TruchasModel();

router.get('/all', async (req, res)=>{
    try{
      let { _id } = req.user;
      let rslt = await TrchMdl.getAll(_id);
      res.status(200).json(rslt);
    }catch(ex){
      console.log(ex);
      res.status(500).json({ "msg": "Algo Malo pasó." });
    }
  }
); // get all

router.get('/near/:longitud/:latitud/:km', async (req,res)=>{
  try{
    let {longitud, latitud, km} = req.params;
    let {_id} = req.user;
    longitud = Number(longitud);
    latitud = Number(latitud);
    let meters = Number(km) * 1000;
    let rslt = await TrchMdl.getNear(_id, longitud, latitud, meters);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Malo pasó." });
  }
} );// get near

router.post('/new', async (req, res)=>{
  try{
    let {_id, email} = req.user;
    let {nombre, latitud, longitud, tags} = req.body;
    let fTags = tags.split("|");
    latitud = Number(latitud);
    longitud = Number(longitud);
    let rslt = await TrchMdl.new(_id, email, longitud, latitud, fTags, nombre);
    res.status(200).json(rslt);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Malo pasó." });
  }
});//new



module.exports = router;
