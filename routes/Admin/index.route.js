const express = require('express');
const router = express.Router();
const userModel = require('../../models/user.model')
const categoryModel = require('../../models/category.model')
const coursesModel = require('../../models/courses.model');
const bcrypt = require('bcryptjs');
const multer = require('multer');
var fs = require('fs');
// GET home page.
router.get('/', async function(req, res) {
    if (req.session.isAuth === true) {
        res.render('vwAdmin/vwCategories')
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

router.get('/categories', async function(req, res) {
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
        detail.count = await coursesModel.countWithByCat(detail.CatName);
        details.push(detail);
    }
    const CatTypes = await coursesModel.allCatType();

    if (req.session.isAuth === true) {
        res.render('vwAdmin/vwCategories', {
            categories: details,
            CatTypes: CatTypes
        });
    } else {
        res.render('vwAdmin/login', {
            layout: false
        });
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
            res.render('vwAdmin/vwCategories');
        }

        categoryModel.add(NewCat);
    });
})

router.get('/categories/delete/:id', async function(req, res) {
    console.log(req.params.id);

    const id = req.params.id;
    const entity = await categoryModel.single(id);
    await categoryModel.del(entity);

    fs.unlink(`./public/Images/Categories/${id}.jpg`, function(err) {
        if (err) throw err;
        console.log('File deleted!');
    });
    res.redirect('/admin/categories');
})

router.post('/categories/update', async function(req, res) {
    req.body.CatID = +req.body.CatID;
    console.log(req.body);
    await categoryModel.patch(req.body);
    res.redirect('/admin/categories');
})

module.exports = router;