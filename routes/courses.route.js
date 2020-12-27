const express = require('express');
const coursesModel = require('../models/courses.model');
const config = require('../config/default.json')
const router = express.Router();

router.get('/all', async function(req, res){
  const page = +req.query.page || 1;
  if(page < 0) page = 1;
  const offset = (page -1) * config.pagination.limit;

  const [total, courses_all] = await Promise.all([
    coursesModel.countWithCat(),
    coursesModel.allWithCat(offset)
  ])

  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for(i = 1; i <= nPages; ++i){
    const item = {
      value: i,
      isActive: i === page
    }
    page_items.push(item);
  }

  res.render('vwCourses/courses', {
    courses: courses_all,
    empty: courses_all.length === 0,
    page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
    all: true
  });
})

router.get('/web', async function(req, res){
  const page = +req.query.page || 1;
  if(page < 0) page = 1;
  const offset = (page -1) * config.pagination.limit;

  const [total, courses_all] = await Promise.all([
    coursesModel.countWithWeb(),
    coursesModel.allWithWeb(offset)
  ])

  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for(i = 1; i <= nPages; ++i){
    const item = {
      value: i,
      isActive: i === page
    }
    page_items.push(item);
  }


  res.render('vwCourses/courses', {
    courses: courses_all,
    empty: courses_all.length === 0,
    page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
    web: true
  });
})

router.get('/web/:categories', async function (req, res) {
  const categories = req.params.categories;
  const page = +req.query.page || 1;
  if(page < 0) page = 1;
  const offset = (page -1) * config.pagination.limit;

  const [total, courses_all] = await Promise.all([
    coursesModel.countWithByCat(categories),
    coursesModel.byCat(categories,offset)
  ])

  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for(i = 1; i <= nPages; ++i){
    const item = {
      value: i,
      isActive: i === page
    }
    page_items.push(item);
  }

  res.render('vwCourses/courses', {
    courses: courses_all,
    empty: courses_all.length === 0,
    page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
    catName: categories
  });
})

router.get('/mobile', async function(req, res){
  const page = +req.query.page || 1;
  if(page < 0) page = 1;
  const offset = (page -1) * config.pagination.limit;

  const [total, courses_all] = await Promise.all([
    coursesModel.countWithMobile(),
    coursesModel.allWithMobile(offset)
  ])

  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for(i = 1; i <= nPages; ++i){
    const item = {
      value: i,
      isActive: i === page
    }
    page_items.push(item);
  }


  res.render('vwCourses/courses', {
    courses: courses_all,
    empty: courses_all.length === 0,
    page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
    mobile: true
  });
})

router.get('/mobile/:categories', async function (req, res) {
  const categories = req.params.categories;
  const page = +req.query.page || 1;
  if(page < 0) page = 1;
  const offset = (page -1) * config.pagination.limit;

  const [total, courses_all] = await Promise.all([
    coursesModel.countWithByCat(categories),
    coursesModel.byCat(categories,offset)
  ])

  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for(i = 1; i <= nPages; ++i){
    const item = {
      value: i,
      isActive: i === page
    }
    page_items.push(item);
  }


  res.render('vwCourses/courses', {
    courses: courses_all,
    empty: courses_all.length === 0,
    page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
    catName: categories
  });
})

router.get('/detail/:id', async function (req, res) {
  const id = req.params.id;
  const course = await coursesModel.single(id);
  if (course === null) {
    return res.redirect('/');
  }

  res.render('vwCourses/detail', {
    course: course
  })
})

router.post('/search',async function(req,res){
  const keyword = req.query.key || " ";
  const sort_type = req.query.sort || "most-relevant";
  if(keyword == " "){
    res.redirect('/');
  }else{
    const keycat = keyword.split(" ");
    var catName = keycat[keycat.length-1] + '*';
    var courseName = keyword.substr(0,keyword.length - catName.length) + '*';
    if(keycat.length == 1){
      catName = " ";
      courseName = keyword.substr(0,keyword.length) + '*';
    }
    const page = +req.query.page || 1;
    if(page < 0) page = 1;
    const offset = (page -1) * config.pagination.limit;
  
    const [total, courses_search] = await Promise.all([
      coursesModel.countWithSearch(courseName, catName),
      coursesModel.bySearch(courseName, catName, sort_type, offset)
    ])
  
    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for(i = 1; i <= nPages; ++i){
      const item = {
        value: i,
        isActive: i === page
      }
      page_items.push(item);
    }
    const url_infor = [];
    const item = {
      current_page: page,
      key: keyword 
    }
    url_infor.push(item);
    res.render('vwCourses/search', {
      courses: courses_search,
      res_count: total,
      key: keyword,
      sort_type: sort_type,
      empty: courses_search.length === 0,
      page_items,
      url_infor,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1
    });
  }
})

router.get('/search',async function(req,res){
  const keyword = req.query.key || " ";
  const sort_type = req.query.sort || "most-relevant";
  if(keyword == " "){
    res.redirect('/');
  }else{
    const keycat = keyword.split(" ");
    var catName = keycat[keycat.length-1] + '*';
    var courseName = keyword.substr(0,keyword.length - catName.length) + '*';
    if(keycat.length == 1){
      catName = " ";
      courseName = keyword.substr(0,keyword.length) + '*';
    }
    const page = +req.query.page || 1;
    if(page < 0) page = 1;
    const offset = (page -1) * config.pagination.limit;
  
    const [total, courses_search] = await Promise.all([
      coursesModel.countWithSearch(courseName, catName),
      coursesModel.bySearch(courseName, catName, sort_type, offset)
    ])
  
    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for(i = 1; i <= nPages; ++i){
      const item = {
        value: i,
        isActive: i === page
      }
      page_items.push(item);
    }
    const url_infor = [];
    const item = {
      current_page: page,
      key: keyword 
    }
    url_infor.push(item);

    res.render('vwCourses/search', {
      courses: courses_search,
      res_count: total,
      key: keyword,
      sort_type: sort_type,
      empty: courses_search.length === 0,
      page_items,
      url_infor,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1
    });
  }
})


module.exports = router;