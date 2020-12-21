// const auth = require('./auth.mdw');

module.exports = function (app) {
  app.use('/', require('../routes/index'))
}