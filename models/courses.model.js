const db = require('../utils/db');
const TBL_CATEGORIES = 'courses';
const config = require('../config/default.json')
module.exports = {
  
  allWithNew(){
    const sql = `
      select c.*, co.*, u.Name as TeacherName, ca.CatName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID join categories ca on ca.CatID = c.CatID
      where Datediff(CURRENT_DATE(), c.DateCreate) <=31
    `;
    return db.load(sql);
  },

  allWithView(){
    const sql = `
      select c.*, co.*, u.Name as TeacherName, ca.CatName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID join categories ca on ca.CatID = c.CatID
      order by co.ViewCount DESC
      limit 10
    `;
    return db.load(sql);
  },

  allWithOutstanding(){
    const sql = `
      select c.*, co.*, u.Name as TeacherName, ca.CatName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID join categories ca on ca.CatID = c.CatID
      order by co.Ratings DESC
      limit 4
    `;
    return db.load(sql);
  },

  allWithCat(offset) {
    const sql = `
      select c.*, co.*, u.Name as TeacherName, ca.CatName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID join categories ca on ca.CatID = c.CatID limit ${config.pagination.limit} offset ${offset}
    `;
    return db.load(sql);
  },

  async countWithCat() {
    const rows = await db.load(`select count(*) as total from courses`);
    return rows[0].total;
  },

  allWithWeb(offset){
    const sql = `
    SELECT c.*, co.*, u.Name as TeacherName, ca.CatName
    from courses c join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID
    where ca.CatType = 1 limit ${config.pagination.limit} offset ${offset}
    `;
    return db.load(sql);
  },

  async countWithWeb() {
    const rows = await db.load(`select count(*) as total from courses c join categories ca on c.CatID = ca.CatID where CatType = 1`);
    return rows[0].total;
  },

  allWithMobile(offset){
    const sql = `
    SELECT c.*, co.*, u.Name as TeacherName, ca.CatName
    from courses c join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID
    where ca.CatType = 0 limit ${config.pagination.limit} offset ${offset}
    `;
    return db.load(sql);
  },

  async countWithMobile() {
    const rows = await db.load(`select count(*) as total from courses c join categories ca on c.CatID = ca.CatID where CatType = 0`);
    return rows[0].total;
  },

  byCat(categories, offset) {
    const sql = `
    SELECT c.*, co.*, u.Name as TeacherName, ca.CatName
    from courses c join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID
    where ca.CatName = '${categories}' limit ${config.pagination.limit} offset ${offset}
    `;
    return db.load(sql);
  },

  async countWithByCat(categories) {
    const rows = await db.load(`SELECT count(*) as total from courses c join categories ca on c.CatID = ca.CatID where ca.CatName = '${categories}'`);
    return rows[0].total;
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_CATEGORIES} where CourseID = ${id}`);
    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  },

  detail(){
    
  }
};
