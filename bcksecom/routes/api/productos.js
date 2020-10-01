// {{host}}/api/productos/
const express = require("express");
const fs = require("fs");
let router = express.Router();

let productosArray = [];

const writeToFile = ()=>{
  fs.writeFileSync('productos.json', JSON.stringify(productosArray));
}

const readFromFile = ()=>{
  try{
  let tmpJsonStr = fs.readFileSync('productos.json');
  productosArray = JSON.parse(tmpJsonStr);
  } catch(ex){
    productosArray = [];
  }
}


router.get('/all', (req, res)=>{
  res.status(200).json(productosArray);
} );

router.get('/one/:id', (req, res)=>{
  let { id } = req.params;
  id = Number(id);
  let products = productosArray.find((o, i)=>{
    return o.id === id;
  })
  res.status(200).json(products);

});

router.post('/new', (req, res)=>{
  const { sku, name, price} = req.body;
  const id = productosArray.length + 1;
  productosArray.push({ id, sku, name, price });
  writeToFile();
  res.status(200).json({ id, sku, name, price });
});

router.put('/upd/:id', (req, res)=>{
  //do something here
  let {id} = req.params;
  id = Number(id);
  let {stock} = req.body;
  stock = Number(stock);

  // Un manejo simple modificar arreglos
  let modified = false;
  let product = null;
  let newProductosArray = productosArray.map( (o,i)=>{
    if( o.id === id) {
      modified = true;
      o.stock = stock;
      product = o;
    }
    return o;
  } );
  writeToFile();
  productosArray = newProductosArray;

  res.status(200).json({modified, product});
});

router.delete('/del/:id', (req, res)=>{
  let {id} = req.params;
  id = Number(id);
  let deleted = false;
  let product = null;
  let newProductsArray = productosArray.find( (o,i)=>{
    if (o.id !== id)
    {
      return true;
    } else {
      deleted = true;
      product = o;
      return false;
    }
  });
  productosArray = newProductsArray;
  writeToFile();
  res.status(200).json({deleted, product});
});

readFromFile();

module.exports = router;
