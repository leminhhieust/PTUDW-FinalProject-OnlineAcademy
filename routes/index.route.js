const express = require('express');
const coursesModel = require('../models/courses.model');
const categoryModel = require('../models/category.model');
const router = express.Router();

// GET home page.
router.get('/', async function(req, res) {
  const courses_new = await coursesModel.allWithNew();
  const courses_view = await coursesModel.allWithView();
  const courses_outstanding = await coursesModel.allWithOutstanding();
  const categories_top = await categoryModel.allWithTop();

  const old_courses = await coursesModel.allWithOld();
  for(i = 0; i < old_courses.length; ++i){
    await coursesModel.updateOldCourses(old_courses[i]);
  }

  const course_bestseller = await coursesModel.bestseller();
  for(i = 0; i < course_bestseller.length; ++i){
    await coursesModel.updateBestSeller(course_bestseller[i]);
  }

  res.render('home', {
    courses_new: courses_new,
    courses_view: courses_view,
    courses_outstanding: courses_outstanding,
    categories_top: categories_top
    });
});

module.exports = router;