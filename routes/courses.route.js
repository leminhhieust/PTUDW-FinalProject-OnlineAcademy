const express = require('express');
const productModel = require('../models/courses.model');

const router = express.Router();

router.get('/', function(req, res){
  res.send("All courses");
})

router.get('/web', function(req, res){
  res.send("All web courses");
})

router.get('/mobile', function(req, res){
  res.send("All mobile courses");
})

// router.get('/byCat/:id', async function (req, res) {
//   const catId = req.params.id;

//   for (const c of res.locals.lcCategories) {
//     if (c.CatID === +catId) {
//       c.isActive = true;
//     }
//   }

//   const rows = await productModel.byCat(catId);
//   res.render('vwProducts/byCat', {
//     products: rows,
//     empty: rows.length === 0
//   })
// })

// router.get('/detail/:id', async function (req, res) {
//   const id = req.params.id;
//   const product = await productModel.single(id);
//   if (product === null) {
//     return res.redirect('/');
//   }

//   res.render('vwProducts/detail', {
//     product: product
//   })
// })

module.exports = router;