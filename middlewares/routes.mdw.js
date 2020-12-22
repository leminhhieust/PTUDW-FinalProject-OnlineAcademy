// const auth = require('./auth.mdw');

module.exports = function (app) {
  app.use('/', require('../routes/index'));

  app.use('/courses', require('../routes/courses.route'));
}