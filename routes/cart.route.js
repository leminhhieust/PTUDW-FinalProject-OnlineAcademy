const express = require('express');
const moment = require('moment');
const cartModel = require('../models/cart.model');
const courseModel = require('../models/courses.model');
const orderModel = require('../models/order.model');
const orderDetailModel = require('../models/order-detail.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const courses = [];
  var total = 0;
  for (const item of req.session.cart) {
    const course = await courseModel.single(item);
    courses.push(course);
    total += course.Price;
  }

  res.render('vwCart/index', {
    courses,
    empty: req.session.cart.length === 0,
    total
  });
})

router.post('/add', function (req, res) {
    const id = +req.body.ID;
    cartModel.add(req.session.cart, id);
    res.redirect(req.headers.referer);
});

router.post('/remove', function (req, res) {
  cartModel.del(req.session.cart, +req.body.id);
  res.redirect(req.headers.referer);
});

router.post('/checkout', async function (req, res) {
  const details = [];
  let total = 0;
  for (const item of req.session.cart) {
    const course = await courseModel.single(item); 
    total += course.Price;

    details.push({
      CourseID: course.CourseID,
      Price: course.Price,
      IsFav: 0
    });
  }

  const order = {
    OrderDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    UserID: req.session.authUser.UserID,
    Total: total
  }
  await orderModel.add(order);

  for (const detail of details) {
    detail.OrderID = order.OrderID;
    await orderDetailModel.add(detail);
  }

  req.session.cart = [];
  res.redirect(req.headers.referer);
});

module.exports = router;