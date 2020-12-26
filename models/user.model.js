const db = require('../utils/db');

const TBL_USERS = 'users';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_USERS}`);
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_USERS} where UserID = ${id}`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async singleByUserName(username) {
    const rows = await db.load(`select * from ${TBL_USERS} where Username = '${username}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async singleByEmail(email) {
    const rows = await db.load(`select * from ${TBL_USERS} where Email = '${email}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  add(entity) {
    return db.add(entity, TBL_USERS)
  },
};
