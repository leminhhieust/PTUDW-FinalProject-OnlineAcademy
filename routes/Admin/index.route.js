const express = require('express');
const router = express.Router();
const userModel = require('../../models/user.model')
const categoryModel = require('../../models/category.model')
const coursesModel = require('../../models/courses.model');
const cousecontentsModel = require('../../models/coursecontents.model');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const multer = require('multer');
var rimraf = require("rimraf");
const auth = require('../../middlewares/auth.mdw');
var fs = require('fs');
// GET home page.
router.get('/', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {
        res.render('vwAdmin/vwAdmin')
    } else {
        res.redirect('/admin/login');
    }
})

router.get('/login', async function(req, res) {
    if (req.session.isAuth === true) {
        res.redirect('/admin');
    } else {
        res.render('vwAdmin/login', {
            layout: false
        });
    }
})

router.post('/login', async function(req, res) {
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('vwAdmin/login', {
            err_message: 'Invalid username or password.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.Password);
    if (ret === false) {
        return res.render('vwAdmin/login', {
            err_message: 'Invalid username or password.'
        });
    }

    if (user.Permission != 0) {
        return res.render('vwAdmin/login', {
            err_message: 'Invalid username or password.'
        });
    }

    req.session.isAuth = true;
    req.session.authUser = user;


    let url = '/admin';
    res.redirect(url);
})

router.post('/logout', async function(req, res) {
    req.session.isAuth = false;
    req.session.authUser = null;
    res.redirect('/admin');
})


router.get('/profile', auth, async function(req, res) {
    const userID = req.session.authUser.UserID;
    const user = await userModel.single(userID);
    console.log(user);
    const courseRegister = await coursesModel.allRegister(userID);
    const courseFav = [];

    for (const course of courseRegister) {
        if (course.IsFav) {
            courseFav.push(course);
        }
    }

    res.render('vwAdmin/profile', {
        user: user,
        courseRegister,
        emptyRegister: courseRegister.length === 0,
        emptyFav: courseFav.length === 0,
        courseFav: courseFav
    });

})

router.post('/profile/edit', async function(req, res) {
    const dob = moment(req.body.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const user = req.session.authUser;
    //console.log(user);
    user.DOB = dob;
    user.Name = req.body.Name;
    user.Email = req.body.Email;

    await userModel.updateUser(user);
    res.redirect('/admin/profile');
})

router.post('/profile/change', async function(req, res) {
    const user = req.session.authUser;
    console.log(user);
    const dob = moment(user.DOB, 'YYYY-MM-DD').format('YYYY-MM-DD');
    user.DOB = dob;
    const hash = bcrypt.hashSync(req.body.newPassword, 10);
    user.Password = hash;

    await userModel.updateUser(user);
    res.redirect('/admin/profile');
})


router.get('/categories', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {

    } else {
        res.redirect('/');
    }
    const categories = await categoryModel.all();
    const details = [];
    for (let index = 0; index < categories.length; index++) {
        const detail = {
            CatID: 0,
            CatName: '',
            CatType: 0,
            count: 0
        }
        detail.CatID = categories[index].CatID;
        detail.CatName = categories[index].CatName;
        detail.CatType = categories[index].CatType;
        detail.count = await coursesModel.countWithByCatID(detail.CatID);
        details.push(detail);
    }
    const CatTypes = await coursesModel.allCatType();

    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {
        res.render('vwAdmin/vwCategories', {
            categories: details,
            CatTypes: CatTypes
        });
    } else {
        res.redirect('/');
    }
})

router.post('/categories', async function(req, res) {
    const NewCat = {
        CatID: 0,
        CatName: '',
        CatType: 0
    };
    const categories = await categoryModel.all();
    NewCat.CatID = categories.length + 1;
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/Images/Categories')
        },
        filename: function(req, file, cb) {
            cb(null, String(categories.length + 1) + '.jpg')
        }
    });
    const upload = multer({ storage });
    upload.single('fuMain')(req, res, function(err) {
        NewCat.CatName = req.body.CatName;
        NewCat.CatType = req.body.CatType;
        if (err) {} else {
            //res.render('vwAdmin/vwCategories');
            res.redirect('/admin/categories');
        }

        categoryModel.add(NewCat);
    });
})

router.get('/categories/delete/:id', async function(req, res) {
    // console.log(req.params.id);
    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {} else {
        res.redirect('/');
    }

    const categories = await categoryModel.all();
    const details = [];
    for (let index = 0; index < categories.length; index++) {
        const detail = {
            CatID: 0,
            CatName: '',
            CatType: 0,
            count: 0
        }
        detail.CatID = categories[index].CatID;
        detail.CatName = categories[index].CatName;
        detail.CatType = categories[index].CatType;
        detail.count = await coursesModel.countWithByCatID(detail.CatID);
        details.push(detail);
    }
    console.log(details);
    const CatTypes = await coursesModel.allCatType();


    const id = req.params.id;
    const entity = await categoryModel.single(id);
    const count = await coursesModel.countWithByCatID(entity.CatID);
    console.log(count);
    if (count === 0) {
        await categoryModel.del(entity);
    } else {
        return res.render('vwAdmin/vwCategories', {
            err_message: 'Không thể xóa lĩnh vực có khóa học',
        });
    }

    fs.unlink(`./public/Images/Categories/${id}.jpg`, function(err) {
        if (err) throw err;
        console.log('File deleted!');
    });
    res.redirect('/admin/categories');
    // res.render('vwAdmin/vwCategories', {
    //     categories: details,
    //     CatTypes: CatTypes
    // });
})

router.post('/categories/update', async function(req, res) {
    req.body.CatID = +req.body.CatID;
    console.log(req.body);
    await categoryModel.patch(req.body);
    res.redirect('/admin/categories');
})

router.get('/courses', async function(req, res) {

    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {} else {
        res.redirect('/');
    }

    const courses_mobile = await coursesModel.allwithmobile_admin();
    const courses_web = await coursesModel.allwithweb_admin();

    if (req.session.isAuth === true) {
        res.render('vwAdmin/vwCourses', {
            courses_mobile: courses_mobile,
            courses_web: courses_web
        });
    } else {
        res.render('vwAccount/login', {
            layout: false
        });
    }

})

router.get('/courses/detail/:id', async function(req, res) {

    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {} else {
        res.redirect('/');
    }

    const id = req.params.id;
    console.log(id);
    const courses = await coursesModel.singleid(id);
    console.log(courses);
    const teacher = await userModel.single(courses.TeacherID);
    res.render('vwAdmin/vwdetailCourses', {
        courses: courses,
        teacher: teacher
    });
})

router.post('/courses/del', async function(req, res) {
    console.log(req.body.CourseID);
    const CourseID = req.body.CourseID;
    const courses = await coursesModel.singleid(CourseID);

    await coursesModel.del(courses);

    const count = await coursesModel.singleid_count_bycourID(CourseID);
    console.log(count);
    await coursesModel.del_count(count);


    const coursescontents = await cousecontentsModel.allwithcourseID(CourseID);
    //console.log(coursescontents);

    for (let index = 0; index < coursescontents.length; index++) {
        await cousecontentsModel.del(coursescontents[index]);

        // fs.unlink(`./public/Videos/Content${CourseID}.mp4`, function(err) {
        //     if (err) throw err;
        //     console.log('File deleted!');
        // });
    }
    rimraf(`./public/Images/Courses/${CourseID}`, function() { console.log("done_del_image"); });
    rimraf(`./public/Videos/${CourseID}`, function() { console.log("done"); });
    res.redirect('/admin/courses')
})

router.get('/users', async function(req, res) {

    if (req.session.isAuth === true && req.session.authUser.Permission === 0) {} else {
        res.redirect('/');
    }
    //const users = await userModel.all();
    const teachers = await userModel.allteacher();
    const students = await userModel.allstudent();
    if (req.session.isAuth === true) {
        res.render('vwAdmin/vwUsers', {
            teachers: teachers,
            students: students
        });
    } else {
        res.render('vwAccount/login', {
            layout: false
        });
    }

})

router.post('/users/add', async function(req, res) {
    const hash = bcrypt.hashSync(req.body.Password, 10);
    const dob = moment(req.body.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const new_teacher = {
        Username: req.body.Username,
        Password: hash,
        Name: req.body.Name,
        Email: req.body.Email,
        Permission: 1,
        DOB: dob
    }

    await userModel.add(new_teacher);
    res.redirect('/admin/users');
})

router.post('/users/remove', async function(req, res) {
    const UserID = req.body.UserID;
    const User = await userModel.single(UserID);
    await userModel.del(User);

    res.redirect('/admin/users')
})

router.post('/users/update', async function(req, res) {
    const hash = bcrypt.hashSync(req.body.Password, 10);
    const dob = moment(req.body.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const update_teacher = {
        UserID: +req.body.UserID,
        Username: req.body.Username,
        Password: hash,
        Name: req.body.Name,
        Email: req.body.Email,
        Permission: 1,
        DOB: dob
    };
    //console.log(update_teacher);
    await userModel.patch(update_teacher);

    res.redirect('/admin/users')
})
module.exports = router;