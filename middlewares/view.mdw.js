const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const moment = require('moment');
const numeral = require('numeral');

module.exports = function (app) {
  app.engine('hbs', exphbs({
    defaultLayout: 'layout.hbs',
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
    helpers: {
      section: hbs_sections(),
      format1(val) {
        return numeral(val).format('$0,0.00');
      },
      format2(val) {
        return numeral(val).format('0,0');
      },
      format3(val) {
        return numeral(val).format('0,0.00');
      },
      formatDate(val){
        return moment(val).format('DD/MM/YYYY');
      }
    }
  }));
  app.set('view engine', 'hbs');
}