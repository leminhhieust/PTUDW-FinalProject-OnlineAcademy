const db = require('../utils/db');
const TBL_CATEGORIES = 'cousecontents';
const config = require('../config/default.json')
module.exports = {
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