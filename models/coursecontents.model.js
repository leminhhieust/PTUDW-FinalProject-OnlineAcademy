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

    allwithcourseID(CourseID, StudentID) {
        return db.load(`SELECT * FROM ${TBL_COURSECONTENT} cc join learn_progress lp on cc.CourseID = lp.CourseID and cc.Index = lp.Index 
        where StudentID = ${StudentID} and cc.CourseID = ${CourseID}`);
    },

    allwithoutProgress(CourseID) {
        return db.load(`SELECT * FROM ${TBL_COURSECONTENT} where CourseID = ${CourseID}`);
    },

    del(entity) {
        const condition = { ContentID: entity.ContentID };
        return db.del(condition, TBL_COURSECONTENT);
    },
}