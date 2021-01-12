const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category.model')
const coursesModel = require('../../models/courses.model');
const cousecontentsModel = require('../../models/coursecontents.model');
const userModel = require('../../models/user.model')

const bcrypt = require('bcryptjs');

const moment = require('moment');
const multer = require('multer');
var fs = require('fs');
const { patch } = require('../../models/category.model');


router.get('/login', async function(req, res) {
    if (req.session.isAuth === true) {
        res.redirect('/teacher');
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

    if (user.Permission != 1) {
        return res.render('vwAdmin/login', {
            err_message: 'Invalid username or password.'
        });
    }

    req.session.isAuth = true;
    req.session.authUser = user;


    let url = '/teacher';
    res.redirect(url);
})

router.get('/', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {} else {
        res.redirect('/teacher/login');
    }
    res.render('viewTeacher/vwteacher');
})

router.get('/createcourses', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {
        const categories = await categoryModel.all();
        res.render('viewTeacher/vwCourses/createcourses', {
            categories: categories
        });
    } else {
        res.redirect('/');
    }

    // const categories = await categoryModel.all();
    // res.render('viewTeacher/vwCourses/createcourses', {
    //     categories: categories
    // });

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
        BadgeNew: 1,
        BadgeBestSeller: 0,
        Totalcontent: 0
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

    const dir_video = `./public/videos/${Cour.CourseID}`;
    fs.access(dir_video, (err) => {
        fs.mkdirSync(dir_video, {
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

        //Cour.IsFav = 0;
        Cour.BadgeNew = 0;
        Cour.BadgeBestSeller = 0;

        Cour.Totalcontent = req.body.Totalcontent;
        // const k = req.body.Video;
        // var arr = k.split(",");

        // for (let index = 0; index < arr.length; index++) {
        //     var Courcontent = {
        //         CourseID: '',
        //         Title: '',
        //         Video: ''
        //     }
        //     Courcontent.CourseID = Cour.CourseID;
        //     Courcontent.Title = index + 1;
        //     Courcontent.Video = arr[index]
        //     cousecontentsModel.add(Courcontent);
        // }
        coursesModel.add(Cour);
        const count = {
            CourseID: Cour.CourseID,
            ViewCount: 0,
            AvgStar: 0,
            StudentCount: 0,
            Ratings: 0
        }
        coursesModel.add_count(count);
        if (err) {} else {
            res.render('viewTeacher/vwCourses/uploadvideincreate', {
                courses: Cour.CourseID,
                Totalcontent: Cour.Totalcontent,
                CurIndex: 0
            });
        }
    });
})

router.get('/updatecourses/:id', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {
        const id = req.params.id;
        const courses = await coursesModel.singleid(id);
        const documents = await cousecontentsModel.singleid(courses.CourseID);
        let CatName_curr = '';
        const categories = await categoryModel.all();
        for (let i = 0; i < categories.length; i++) {
            if (courses.CatID === categories[i].CatID) {
                CatName_curr = categories[i].CatName;
            }
        }
        let index = await cousecontentsModel.countCourID(courses.CourseID);
        if (index >= courses.Totalcontent) {
            courses.Status = 1;
        } else {
            courses.Status = 0;
        }
        res.render('viewTeacher/vwCourses/updatecourses', {
            categories: categories,
            courses: courses,
            documents: documents,
            CatName_curr: CatName_curr
        });
    } else {
        res.redirect('/');
    }
    // const id = req.params.id;
    // const courses = await coursesModel.singleid(id);
    // const documents = await cousecontentsModel.singleid(courses.CourseID);
    // let CatName_curr = '';
    // const categories = await categoryModel.all();
    // for (let i = 0; i < categories.length; i++) {
    //     if (courses.CatID === categories[i].CatID) {
    //         CatName_curr = categories[i].CatName;
    //     }
    // }
    // let index = await cousecontentsModel.countCourID(courses.CourseID);
    // if (index >= courses.Totalcontent) {
    //     courses.Status = 1;
    // } else {
    //     courses.Status = 0;
    // }
    // res.render('viewTeacher/vwCourses/updatecourses', {
    //     categories: categories,
    //     courses: courses,
    //     documents: documents,
    //     CatName_curr: CatName_curr
    // });
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
    //console.log(req.body.NewVideo);
    for (let index = 0; index < arr.length; index++) {
        Courcontent[index].CourseID = courses.CourseID;
        Courcontent[index].Title = req.body.NewVideo[index];
        console.log(req.body.NewVideo[index]);
        cousecontentsModel.patch(Courcontent[index]);
    }

    coursesModel.patch(courses);

    res.redirect(`/teacher/profile`);
})

router.get('/profile', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {
        const users = await userModel.single(req.session.authUser.UserID);
        console.log(users);
        courses = await coursesModel.allcoursesofteacher(users.UserID);
        for (let i = 0; i < courses.length; i++) {
            const index = await cousecontentsModel.countCourID(courses[i].CourseID);
            if (index >= courses[i].Totalcontent) {
                courses[i].Status = 1;
            } else {
                courses[i].Status = 0;
            }
        }
        const DOB = moment(users.DOB, 'YYYY-MM-DD').format('DD/MM/YYYY');
        res.render('viewTeacher/vwprofile', {
            users: users,
            DOB: DOB,
            courses: courses
        });
    } else {
        res.redirect('/');
    }
    // const users = await userModel.single(req.session.authUser.UserID);
    // console.log(users);
    // courses = await coursesModel.allcoursesofteacher(users.UserID);
    // for (let i = 0; i < courses.length; i++) {
    //     const index = await cousecontentsModel.countCourID(courses[i].CourseID);
    //     if (index >= courses[i].Totalcontent) {
    //         courses[i].Status = 1;
    //     } else {
    //         courses[i].Status = 0;
    //     }
    // }
    // const DOB = moment(users.DOB, 'YYYY-MM-DD').format('DD/MM/YYYY');
    // res.render('viewTeacher/vwprofile', {
    //     users: users,
    //     DOB: DOB,
    //     courses: courses
    // });

})

router.post('/profile', async function(req, res) {
    const users = await userModel.single(req.body.UserID);
    users.Name = req.body.Name;
    users.Email = req.body.Email;
    const dob = moment(req.body.DOB, 'DD-MM-YYYY').format('YYYY-MM-DD');
    users.DOB = dob;
    users.Des = req.body.Des;

    await userModel.patch(users);


    res.redirect('/teacher/profile')

})

router.get('/uploadvideo_increate/:id', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {
        const id = req.params.id;
        const courses = await coursesModel.singleid(id);
        //console.log(courses);
        // const index = await cousecontentsModel.countCourID(courses.CourseID);
        // if (index >= courses.Totalcontent) {
        //     courses.Status = 1;
        // } else {
        //     courses.Status = 0;
        // }
        res.render('viewTeacher/vwCourses/uploadvideincreate', {
            courses: id,
            Status: courses.Status,
            Totalcontent: courses.Totalcontent
        });
    } else {
        res.redirect('/');
    }

    // const id = req.params.id;
    // const courses = await coursesModel.singleid(id);
    // //console.log(courses);
    // // const index = await cousecontentsModel.countCourID(courses.CourseID);
    // // if (index >= courses.Totalcontent) {
    // //     courses.Status = 1;
    // // } else {
    // //     courses.Status = 0;
    // // }
    // res.render('viewTeacher/vwCourses/uploadvideincreate', {
    //     courses: id,
    //     Status: courses.Status,
    //     Totalcontent: courses.Totalcontent
    // });
})

router.post('/uploadvideo_increate/:id', async function(req, res) {
    if (req.session.isAuth === true && req.session.authUser.Permission === 1) {} else {
        res.redirect('/');
    }
    var Courcontent = {
        CourseID: '',
        Index: 1,
        Title: '',
        //Video: ''
    }
    const id = req.params.id;
    const index = await cousecontentsModel.countCourID(id) + 1;
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `./public/videos/${id}`)
        },
        filename: function(req, file, cb) {
            cb(null, `Content${index}.mp4`)
            Courcontent.Title = file.originalname;
            //Courcontent.Video = file.originalname;
        }
    });

    const upload = multer({ storage });
    upload.single('fuVideo')(req, res, async function(err) {
        let index = await cousecontentsModel.countCourID(req.body.CourseID);
        Courcontent.CourseID = req.body.CourseID;
        Courcontent.Index = index + 1;
        cousecontentsModel.add(Courcontent);
        let Status;
        if (Courcontent.Index >= req.body.Totalcontent) {
            Status = 1;
        } else {
            Status = 0;
        }

        if (err) {} else {
            res.render('viewTeacher/vwCourses/uploadvideincreate', {
                courses: req.body.CourseID,
                Totalcontent: req.body.Totalcontent,
                Status: Status,
                CurIndex: index
            });
        }
    });
})
module.exports = router;