let express = require('express');
let router = express.Router();

router.get('/prueba',(req,res)=>{
    let msg = "Si funciona";
    res.status(200).json(msg);
});











module.exports = router;