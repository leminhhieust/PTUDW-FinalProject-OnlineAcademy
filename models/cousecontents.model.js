const db = require('../utils/db');
const TBL_CATEGORIES = 'coursecontent';
const config = require('../config/default.json')
module.exports = {
    async countCourID(CourseID) {
        const rows = await db.load(`select count(*) as total from ${TBL_CATEGORIES} cc
                                   where cc.CourseID= ${CourseID}`);
        return rows[0].total;
    },

    add(entity) {
        return db.add(entity, TBL_CATEGORIES)
    },

    singleid(id) {
        var sql = `select * from ${TBL_CATEGORIES} where CourseID = ${id}`;
        return db.load(sql);
    },

    patch(entity) {
        const condition = { ContentID: entity.ContentID };
        delete entity.ContentID;
        return db.patch(entity, condition, TBL_CATEGORIES);
    },
}