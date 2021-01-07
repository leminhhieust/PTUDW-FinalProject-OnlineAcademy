const db = require('../utils/db');
const TBL_FEEDBACK = 'feedback';
module.exports = {

    allOfFeedback(id) {
        const sql = `
        SELECT fb.*, u.Name
        FROM feedback fb join courses c on fb.CourseID = c.CourseID join users u on u.UserID = fb.StudentID
        Where c.CourseID = ${id}
        `;
        return db.load(sql)
    },

    allByID(id) {
        const sql = `
        SELECT * FROM feedback Where CourseID = ${id}
        `;
        return db.load(sql)
    },

    async percentByIDandStar(id, star){
        const rows1 = await db.load(`SELECT * FROM feedback Where CourseID = ${id}`);
        if (rows1.length === 0)
            return 0;
        
        const rows2 = await db.load(` SELECT * FROM feedback where CourseID = ${id} and Star = ${star}`);

        if (rows2.length === 0)
            return 0;
        
        return (rows2.length / rows1.length).toFixed(2) * 100;
    },

    async singleFeedback(courseID, userID) {
        const rows = await db.load(`SELECT * FROM feedback where CourseID = ${courseID} and StudentID = ${userID}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    async singleByID(id) {
        const rows = await db.load(`SELECT * FROM feedback where FeedbackID = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    add(entity){
        return db.add(entity,TBL_FEEDBACK);
    },


    del(id) {
        const condition = { FeedbackID: id };
        return db.del(condition, TBL_FEEDBACK);
    },

    patch(entity){
        return db.patch(entity,{FeedbackID: entity.FeedbackID},TBL_FEEDBACK);
    },

};