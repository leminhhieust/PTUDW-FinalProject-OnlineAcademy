const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category.model')
const coursesModel = require('../../models/courses.model');
const cousecontentsModel = require('../../models/cousecontents.model');
const userModel = require('../../models/user.model')


const moment = require('moment');
const multer = require('multer');
var fs = require('fs');
const { patch } = require('../../models/category.model');

router.get('/createcourses', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {} else {
        res.redirect('/');
    }

    const categories = await categoryModel.all();
    res.render('viewTeacher/vwCourses/createcourses', {
        categories: categories
    });

})

router.post('/createcourses', async function(req, res) {
    const Cour = {
        CourseID: 0,
        Name: '',
        CatID: '',
        TeacherID: '',
        Status: '0',
        DateCreate: '',
        DateUpdate: '',
        Price: 0,
        TinyDes: '',
        FullDes: '',
        IsFav: 0,
        BadgeNew: 0,
        BadgeBestSeller: 0
    };


    const courses = await coursesModel.all();
    Cour.CourseID = courses.length + 1;

    const dir = `./public/images/Courses/${Cour.CourseID}`;

    fs.access(dir, (err) => {
        fs.mkdirSync(dir, {
            recursive: true
        });
        console.log(`Directory ${err ? 'does not exist' : 'exists'}`);
    });


    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `./public/images/Courses/${Cour.CourseID}`)
        },
        filename: function(req, file, cb) {
            cb(null, 'tiny.jpg')
        }
    });

    const upload = multer({ storage });
    upload.single('fuMain')(req, res, function(err) {
        console.log(req.body);

        Cour.Name = req.body.Name;
        Cour.CatID = req.body.CatType;
        Cour.TeacherID = req.session.authUser.UserID;
        if (req.body.Status === "Hoàn thành") {
            Cour.Status = 1;
        } else {
            Cour.Status = 0;
        }
        const dob = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        Cour.DateCreate = dob;
        Cour.DateUpdate = ('0000-00-00');
        Cour.Price = req.body.Price;
        Cour.TinyDes = req.body.TinyDes;
        Cour.FullDes = req.body.FullDes;

        Cour.IsFav = 0;
        Cour.BadgeNew = 0;
        Cour.BadgeBestSeller = 0;

        const k = req.body.Video;
        var arr = k.split(",");

        for (let index = 0; index < arr.length; index++) {
            var Courcontent = {
                CourseID: '',
                Title: '',
                Video: ''
            }
            Courcontent.CourseID = Cour.CourseID;
            Courcontent.Title = index + 1;
            Courcontent.Video = arr[index]
            cousecontentsModel.add(Courcontent);
        }
        coursesModel.add(Cour);
        if (err) {} else {
            res.redirect('/teacher/createcourses');
        }
    });
})

router.get('/updatecourses/:id', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {} else {
        res.redirect('/');
    }

    const id = req.params.id;
    console.log(id);
    const courses = await coursesModel.singleid(id);
    console.log(courses);
    const documents = await cousecontentsModel.singleid(courses.CourseID);
    console.log(documents);
    let CatName_curr = '';
    const categories = await categoryModel.all();
    for (let i = 0; i < categories.length; i++) {
        if (courses.CatID === categories[i].CatID) {
            CatName_curr = categories[i].CatName;
        }
    }
    console.log(CatName_curr);
    res.render('viewTeacher/vwCourses/updatecourses', {
        categories: categories,
        courses: courses,
        documents: documents,
        CatName_curr: CatName_curr
    });
})

router.post('/updatecourses/:id', async function(req, res) {
    console.log(req.body);
    const id = req.params.id;
    const courses = await coursesModel.singleid(id);
    console.log(courses);

    courses.Name = req.body.Name;
    courses.CatID = +req.body.CatType;
    if (req.body.Status === "Hoàn thành") {
        courses.Status = 1;
    } else {
        courses.Status = 0;
    }
    const dob = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
    courses.DateUpdate = dob;
    courses.Price = req.body.Price;
    courses.TinyDes = req.body.TinyDes;
    courses.FullDes = req.body.FullDes;

    var Courcontent = await cousecontentsModel.singleid(courses.CourseID);
    var arr = req.body.NewVideo;
    for (let index = 0; index < arr.length; index++) {

        Courcontent[index].CourseID = courses.CourseID;
        Courcontent[index].Title = index + 1;
        Courcontent[index].Video = arr[index]
        cousecontentsModel.patch(Courcontent[index]);
    }

    coursesModel.patch(courses);

    res.redirect(`/teacher/updatecourses/${id}`);
})

router.get('/profile', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {} else {
        res.redirect('/');
    }


    const users = await userModel.single(req.session.authUser.UserID);
    courses = await coursesModel.allcoursesofteacher(users.UserID);
    const DOB = moment(users.DOB, 'YYYY-MM-DD').format('MM/DD/YYYY');
    res.render('viewTeacher/vwprofile', {
        users: users,
        DOB: DOB,
        courses: courses
    });

})

router.post('/profile', async function(req, res) {

    const users = await userModel.single(req.body.UserID);
    users.Name = req.body.Name;
    users.Email = req.body.Email;
    const dob = moment(req.body.DOB, 'MM/DD/YYYY').format('YYYY-MM-DD');
    users.DOB = dob;
    users.Des = req.body.Des;

    await userModel.patch(users);


    res.redirect('/teacher/profile');

})

module.exports = router;