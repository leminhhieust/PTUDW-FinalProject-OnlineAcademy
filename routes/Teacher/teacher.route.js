const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category.model')
const coursesModel = require('../../models/courses.model');
const cousecontentsModel = require('../../models/cousecontents.model');



const moment = require('moment');
const multer = require('multer');
var fs = require('fs');
const { patch } = require('../../models/category.model');

router.get('/createcourses', async function(req, res) {
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


module.exports = router;