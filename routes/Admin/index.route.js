const express = require('express');
const router = express.Router();
const userModel = require('../../models/user.model')
const bcrypt = require('bcryptjs');
// GET home page.
router.get('/', async function(req, res) {
    if (req.session.isAuth === true) {
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

    req.session.isAuth = true;
    req.session.authUser = user;

    let url = '/admin';
    res.redirect(url);
})


module.exports = router;