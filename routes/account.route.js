const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../models/user.model');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/login', async function(req, res) {
    if (req.headers.referer) {
        req.session.retUrl = req.headers.referer;
    }

    res.render('vwAccount/login');
})

router.post('/login', async function(req, res) {
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('vwAccount/login', {
            err_message: 'Invalid username or password.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.Password);
    if (ret === false) {
        return res.render('vwAccount/login', {
            err_message: 'Invalid username or password.'
        });
    }

    req.session.isAuth = true;
    req.session.authUser = user;
    // req.session.cart = [];
    let url = req.session.retUrl || '/';
    res.redirect(url);
})

router.post('/logout', async function(req, res) {
    req.session.isAuth = false;
    req.session.authUser = null;
    //   req.session.cart = [];
    res.redirect(req.headers.referer);
})

router.get('/register', async function(req, res) {
    res.render('vwAccount/register');
})

router.post('/register', async function(req, res) {
    const hash = bcrypt.hashSync(req.body.Password, 10);
    const dob = moment(req.body.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const user = {
        Username: req.body.Username,
        Password: hash,
        DOB: dob,
        Name: req.body.Name,
        Email: req.body.Email,
        Permission: 2
    }

    await userModel.add(user);
    res.render('vwAccount/register');
})

router.get('/is-available-username', async function(req, res) {
    const username = req.query.user;
    const user = await userModel.singleByUserName(username);
    if (user === null) {
        return res.json(true);
    }

    res.json(false);
})

router.get('/is-available-email', async function(req, res) {
    const email = req.query.email;
    const user = await userModel.singleByEmail(email);
    if (user === null) {
        return res.json(true);
    }

    res.json(false);
})

router.get('/profile', auth, async function(req, res) {
    if (req.session.authUser.Permission) {
        res.render('vwAccount/profile');
    } else {
        res.render('Admin/vwAccount/profile');
    }
})

module.exports = router;