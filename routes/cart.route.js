// const express = require('express');
// const moment = require('moment');
// const cartModel = require('../../models/cart.model');
// const productModel = require('../../models/product.model');
// const orderModel = require('../../models/order.model');
// const orderDetailModel = require('../../models/order-detail.model');

// const router = express.Router();

// router.get('/', async function (req, res) {
//   const items = [];
//   for (const ci of req.session.cart) {
//     const product = await productModel.single(ci.id);
//     items.push({
//       ...ci,
//       // id: ci.id,
//       // quantity: ci.quantity,
//       product,
//       amount: ci.quantity * product.Price
//     })
//   }

//   res.render('vwCart/index', {
//     items,
//     empty: req.session.cart.length === 0
//   });
// })

// router.post('/add', function (req, res) {
//   const item = {
//     id: +req.body.id,
//     quantity: +req.body.quantity
//   };
//   cartModel.add(req.session.cart, item);
//   res.redirect(req.headers.referer);
// });

// router.post('/remove', function (req, res) {
//   cartModel.del(req.session.cart, +req.body.id);
//   res.redirect(req.headers.referer);
// });

// router.post('/checkout', async function (req, res) {
//   const details = [];
//   let total = 0;
//   for (const ci of req.session.cart) {
//     const product = await productModel.single(ci.id);
//     const amount = ci.quantity * product.Price;
//     total += amount;

//     details.push({
//       ProID: product.ProID,
//       Quantity: ci.quantity,
//       Price: product.Price,
//       Amount: amount
//     });
//   }

//   const order = {
//     OrderDate: moment().format('YYYY-MM-DD HH:mm:ss'),
//     UserID: req.session.authUser.id,
//     Total: total
//   }
//   await orderModel.add(order);

//   for (const detail of details) {
//     detail.OrderID = order.OrderID;
//     await orderDetailModel.add(detail);
//   }

//   req.session.cart = [];
//   res.redirect(req.headers.referer);
// });

// module.exports = router;