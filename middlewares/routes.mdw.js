const auth = require('./auth.mdw');
const prevent = require('./prevent.mdw');
const preventToTeacher = require('./preventToTeacher.mdw');
const preventToAdmin = require('./preventToAdmin.mdw');

module.exports = function(app) {
    app.use('/', require('../routes/index.route'));

    app.use('/courses',prevent, require('../routes/courses.route'));

    app.use('/account',prevent, require('../routes/account.route'));

    app.use('/admin',preventToAdmin, require('../routes/Admin/index.route'));

    app.use('/teacher',preventToTeacher, require('../routes/Teacher/teacher.route'));

    app.use('/cart', auth, require('../routes/cart.route'));

    app.use('/courses/feedback', require('../routes/feedback.route'));

}