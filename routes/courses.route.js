const express = require('express');
const coursesModel = require('../models/courses.model');

const router = express.Router();

router.get('/', function(req, res){
  res.send("All courses");
})

router.get('/web', async function(req, res){
  const courses_web = await coursesModel.allWithWeb();
  res.render('vwCourses/courses', {
    courses: courses_web,
    empty: courses_web.count === 0
  });
})

router.get('/web/:categories', async function (req, res) {
  const categories = req.params.categories;
  const courses_byCat = await coursesModel.byCat(categories);
  if (courses_byCat === null) {
    return res.redirect('/');
  }

  res.render('vwCourses/courses', {
    courses: courses_byCat,
    empty: courses_byCat.count === 0
  });
})

router.get('/mobile', async function(req, res){
  const courses_mobile = await coursesModel.allWithMobile();
  res.render('vwCourses/courses', {
    courses: courses_mobile,
    empty: courses_mobile.count === 0
  });
})

router.get('/mobile/:categories', async function (req, res) {
  const categories = req.params.categories;
  const courses_byCat = await coursesModel.byCat(categories);
  if (courses_byCat === null) {
    return res.redirect('/');
  }

  res.render('vwCourses/courses', {
    courses: courses_byCat,
    empty: courses_byCat.count === 0
  });
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