const auth = require('./auth.mdw');

module.exports = function(app) {
    app.use('/', require('../routes/index.route'));

    app.use('/courses', require('../routes/courses.route'));

    app.use('/account', require('../routes/account.route'));

    app.use('/admin', require('../routes/Admin/index.route'));

    app.use('/teacher', require('../routes/Teacher/teacher.route'));

    app.use('/cart', auth, require('../routes/cart.route'));
}