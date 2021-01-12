const db = require('../utils/db');
const TBL_COURSECONTENT = 'coursecontent';
const config = require('../config/default.json')
module.exports = {
    async countCourID(CourseID) {
        const rows = await db.load(`select count(*) as total from ${TBL_COURSECONTENT} cc
                                   where cc.CourseID= ${CourseID}`);
        return rows[0].total;
    },

    add(entity) {
        return db.add(entity, TBL_COURSECONTENT)
    },

    singleid(id) {
        var sql = `select * from ${TBL_COURSECONTENT} where CourseID = ${id}`;
        return db.load(sql);
    },

    async singleByCourseIDIndex(courseID, index) {
        const rows = await db.load(`select * from ${TBL_COURSECONTENT} c where c.CourseID= ${courseID} and c.Index = ${index}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    patch(entity) {
        const condition = { ContentID: entity.ContentID };
        delete entity.ContentID;
        return db.patch(entity, condition, TBL_COURSECONTENT);
    },

    allwithcourseID(id) {
        return db.load(`select *
         from ${TBL_COURSECONTENT} cc 
         where cc.CourseID=${id} `);
    },

    del(entity) {
        const condition = { ContentID: entity.ContentID };
        return db.del(condition, TBL_COURSECONTENT);
    },
}