let express = require('express');
let router = express.Router();
let categoriaModel = require('../../models/categorias.model')();
router.get('/prueba',(req,res)=>{
    let msg = "Si funciona";
    res.status(200).json(msg);
});

router.get('/all',(req,res)=>{
    categoriaModel.getAll((err,result)=>{
        if (err){
            console.log(err);
            return res.status(503).json({"error":"Algo salio mal."});
          }
          return res.status(200).json(result);
    });
});

router.get('/one/:id',(req,res)=>{
    let {id} = req.params;
    id = Number(id);
    categoriaModel.getOne(id,(err,result)=>{
        if (err){
            console.log(err);
            return res.status(503).json({"error":"Algo salio mal."});
          }

        return res.status(200).json(result);
    });
});

router.post('/new',(req,res)=>{
    let {name,type} = req.body;
    categoriaModel.addOne(name,type,(err,result)=>{
        if (err){
            console.log(err);
            return res.status(503).json({"error":"Algo salio mal."});
          }

        return res.status(200).json(result);
    });
});

router.put('/upd/:id',(req,res)=>{
    let {id} = req.params;
    id = Number(id);
    let {name,type} = req.body;
    categoriaModel.updateOne(id,name,type,(err,result)=>{
        if (err){
            console.log(err);
            return res.status(503).json({"error":"Algo salio mal."});
          }

        return res.status(200).json(result);
    });
});

router.delete('/del/:id',(req,res)=>{
    let {id} = req.params;
    categoriaModel.deleteOne(id,(err,result)=>{
        if (err){
            console.log(err);
            return res.status(503).json({"error":"Algo salio mal."});
          }

        return res.status(200).json(result);
    });
});










module.exports = router;