const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const nodemailer = require('nodemailer');

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
    if (user === null || user.Permission !== 2) {
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

    if (user.Permission !== 2){
        return res.render('vwAccount/login', {
            err_message: 'Invalid username or password.'
        });
    }

    req.session.isAuth = true;
    req.session.authUser = user;
    // req.session.cart = [];
    let url = req.session.retUrl || '/';
    if(url === "http://localhost:3000/account/register"){
        url = '/';
    }
    res.redirect(url);
})

router.post('/logout', async function(req, res) {
    req.session.isAuth = false;
    req.session.authUser = null;
    //   req.session.cart = [];
    res.redirect(req.headers.referer);
})

router.get('/register', async function(req, res) {
    if (req.headers.referer) {
        req.session.retUrl = req.headers.referer;
    }

    res.render('vwAccount/register',{
        verification: false
    });
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
    req.session.authUser = user;
    res.redirect('/account/verification');
})

router.get('/verification', async function(req, res){
    const code = Math.floor(Math.random() * (999999 - 100000) ) + 100000;

    var transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'onlineacademyvn@gmail.com',
            pass: 'admin@1234'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mainOptions = {
        from: 'onlineacademyvn@gmail.com',
        to: req.session.authUser.Email,
        subject: 'Verification your email',
        text: 'Your code is: ' + code
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            // res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            // res.redirect('/');
        }
    });

    res.render('vwAccount/register',{
        verification: true,
        verifycode: code
    });
})

router.post('/verification', async function(req, res){
    await userModel.add(req.session.authUser);
    req.session.isAuth = true;
    let url = req.session.retUrl || '/';
    if(url === "http://localhost:3000/account/login"){
        url = '/';
    }
    res.redirect(url);
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