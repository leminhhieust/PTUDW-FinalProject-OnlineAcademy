const db = require('../utils/db');

const TBL_USERS = 'users';

module.exports = {

    allteacher() {
        const sql = `select *
        from users
        where Permission=1`;
        return db.load(sql);
    },

    allstudent() {
        const sql = `select *
        from users
        where Permission=2`;
        return db.load(sql);
    },

    del(entity) {
        const condition = { UserID: entity.UserID };
        return db.del(condition, TBL_USERS);
    },

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

    patch(entity) {
        const condition = { UserID: entity.UserID };
        delete entity.UserID;
        return db.patch(entity, condition, TBL_USERS);
    },
};