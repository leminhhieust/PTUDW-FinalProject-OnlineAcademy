const db = require('../utils/db');
const TBL_CATEGORIES = 'courses';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_CATEGORIES}`);
  },

  allWithNew(){
    const sql = `
      select c.*, co.*, u.Name as TeacherName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID
      where Datediff(CURRENT_DATE(), c.DateCreate) <=31
    `;
    return db.load(sql);
  },

  allWithView(){
    const sql = `
      select c.*, co.*, u.Name as TeacherName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID
      order by co.ViewCount DESC
      limit 10
    `;
    return db.load(sql);
  },

  allWithOutstanding(){
    const sql = `
      select c.*, co.*, u.Name as TeacherName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID
      order by co.Ratings DESC
      limit 4
    `;
    return db.load(sql);
  },

  byCat(catId) {
    return db.load(`select * from ${TBL_CATEGORIES} where CatID = ${catId}`);
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_CATEGORIES} where CourseID = ${id}`);
    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  },
};
