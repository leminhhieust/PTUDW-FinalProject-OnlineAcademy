const db = require('../utils/db');

const TBL_ORDERDETAILS = 'orderdetails';

module.exports = {
  add(entity) {
    return db.add(entity, TBL_ORDERDETAILS);
  }
};
