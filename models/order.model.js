const db = require('../utils/db');

const TBL_ORDERS = 'orders';

module.exports = {
  async add(entity) {
    const ret = await db.add(entity, TBL_ORDERS);
    entity.OrderID = ret.insertId;
  }
};
