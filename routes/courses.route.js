const express = require('express');
const coursesModel = require('../models/courses.model');
const config = require('../config/default.json');
const feedbackModel = require('../models/feedback.model');
const courseContent = require('../models/coursecontents.model');
const session = require('express-session');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/all', async function(req, res) {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;

    const [total, courses_all] = await Promise.all([
        coursesModel.countWithCat(),
        coursesModel.allWithCat(offset)
    ])

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; ++i) {
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

router.get('/web', async function(req, res) {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;

    const [total, courses_all] = await Promise.all([
        coursesModel.countWithWeb(),
        coursesModel.allWithWeb(offset)
    ])

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; ++i) {
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

router.get('/web/:categories', async function(req, res) {
    const categories = req.params.categories;
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;

    const [total, courses_all] = await Promise.all([
        coursesModel.countWithByCat(categories),
        coursesModel.byCat(categories, offset)
    ])

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; ++i) {
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

router.get('/mobile', async function(req, res) {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;

    const [total, courses_all] = await Promise.all([
        coursesModel.countWithMobile(),
        coursesModel.allWithMobile(offset)
    ])

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; ++i) {
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

router.get('/mobile/:categories', async function(req, res) {
    const categories = req.params.categories;
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;

    const [total, courses_all] = await Promise.all([
        coursesModel.countWithByCat(categories),
        coursesModel.byCat(categories, offset)
    ])

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; ++i) {
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

router.get('/detail/:id', async function(req, res) {
    const id = +req.params.id;
    await coursesModel.updateViewCount(id);
    const course = await coursesModel.single(id);
    const coursecontent = await coursesModel.withCourseContent(id);
    const courseOfTeacher = await coursesModel.allOfTeacher(id);
    const feedback = await feedbackModel.allOfFeedback(id);
    const courseRelate = await coursesModel.withRelateCourse(id);

    var isRegister, isFav, FeedbackID;

    if (req.session.isAuth) {
        const courseRegister = await coursesModel.singleByUser(id, req.session.authUser.UserID);
        const checkRegister = await coursesModel.singleRegister(id, req.session.authUser.UserID);
        if (checkRegister === null) {
            isRegister = false;
        } else {
            isRegister = true;
            if (courseRegister.IsFav) {
                isFav = 1;
            } else {
                isFav = 0;
            }

            const checkFb = await feedbackModel.singleFeedback(id, req.session.authUser.UserID);
            if (checkFb) {
                FeedbackID = checkFb.FeedbackID;
            } else {
                FeedbackID = 0;
            }
        }
    }

    const Stars = [];
    for (i = 5; i >= 1; --i) {
        const star = await feedbackModel.percentByIDandStar(id, i);
        Stars.push({ Star: star });
    }

    if (course === null) {
        return res.redirect('/');
    }

    res.render('vwCourses/detail', {
        course: course,
        coursecontent: coursecontent,
        firstcourse: coursecontent[0],
        courseOfTeacher: courseOfTeacher,
        feedback: feedback,
        courseRelate: courseRelate,
        isRegister,
        isFav,
        FeedbackID,
        isAddCart: req.session.cart.includes(id),
        Stars,
        CourseNum: coursecontent.length
      })
})


router.get('/changeFav', async function(req, res) {
    const isFav = +req.query.isFav;
    const courseID = +req.query.id;
    const courseRegister = await coursesModel.singleByUser(courseID, req.session.authUser.UserID);

    await coursesModel.updateFav(courseRegister, isFav);

    res.redirect(req.headers.referer);
})

router.post('/search', async function(req, res) {
    const keyword = req.query.key || " ";
    const sort_type = req.query.sort || "most-relevant";
    if (keyword == " ") {
        res.redirect('/');
    } else {
        const keycat = keyword.split(" ");
        var catName = keycat[keycat.length - 1] + '*';
        var courseName = keyword.substr(0, keyword.length - catName.length) + '*';
        if (keycat.length == 1) {
            catName = " ";
            courseName = keyword.substr(0, keyword.length) + '*';
        }
        const page = +req.query.page || 1;
        if (page < 0) page = 1;
        const offset = (page - 1) * config.pagination.limit;

        const [total, courses_search] = await Promise.all([
            coursesModel.countWithSearch(courseName, catName),
            coursesModel.bySearch(courseName, catName, sort_type, offset)
        ])

        const nPages = Math.ceil(total / config.pagination.limit);
        const page_items = [];
        for (i = 1; i <= nPages; ++i) {
            const item = {
                value: i,
                isActive: i === page,
                key: keyword,
                sort_type: sort_type
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

router.get('/search', async function(req, res) {
    const keyword = req.query.key || " ";
    const sort_type = req.query.sort || "most-relevant";
    if (keyword == " ") {
        res.redirect('/');
    } else {
        const keycat = keyword.split(" ");
        var catName = keycat[keycat.length - 1] + '*';
        var courseName = keyword.substr(0, keyword.length - catName.length) + '*';
        if (keycat.length == 1) {
            catName = " ";
            courseName = keyword.substr(0, keyword.length) + '*';
        }
        const page = +req.query.page || 1;
        if (page < 0) page = 1;
        const offset = (page - 1) * config.pagination.limit;

        const [total, courses_search] = await Promise.all([
            coursesModel.countWithSearch(courseName, catName),
            coursesModel.bySearch(courseName, catName, sort_type, offset)
        ])

        const nPages = Math.ceil(total / config.pagination.limit);
        const page_items = [];
        for (i = 1; i <= nPages; ++i) {
            const item = {
                value: i,
                isActive: i === page,
                key: keyword,
                sort_type: sort_type
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

router.get('/learn',auth, async function(req,res){
  const courseID = +req.query.courseID;
  const index = +req.query.index;
  const checkRegister = await coursesModel.singleRegister(courseID,req.session.authUser.UserID);
  const checkExistCourse = await coursesModel.singleid(courseID);
  const allCourseContent = await courseContent.allwithcourseID(courseID, req.session.authUser.UserID);
  const currentContent = await courseContent.singleByCourseIDIndex(courseID, index);

  if(checkExistCourse === null){
    res.redirect('/');
  }

  if(index > allCourseContent.length){
    res.redirect(`/courses/detail/${courseID}`);
  }

  if(checkRegister === null){
    res.redirect(`/courses/detail/${courseID}`)
  }

  const Contents = [];
  for(i = 0; i < allCourseContent.length; ++i){
    const Content = {
      content: allCourseContent[i],
      isActive: allCourseContent[i].Index === index,
      isDone: allCourseContent[i].Status === 1
    }
    Contents.push(Content);
  }

  const allDone = await coursesModel.allDone(req.session.authUser.UserID, courseID);
  var percent = ((allDone.length / Contents.length)*100).toFixed(0);

  var info = {
    courseID: courseID,
    index: index
  }

  res.render('vwCourses/learn', {
    currentContent,
    Contents,
    Course: checkExistCourse,
    percent,
    info
  });

})

router.get('/learn/change-status', async function(req, res){
  const courseID = req.query.courseID;
  const index = req.query.index;
  const status = req.query.status;
  const progress = await coursesModel.singleProgress(req.session.authUser.UserID, courseID, index)

  if(progress){
    progress.Status = status;
    await coursesModel.updateProgressStatus(progress);
  }
 

  return res.json(true);
})

module.exports = router;