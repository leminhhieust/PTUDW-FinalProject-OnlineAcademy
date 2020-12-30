const db = require('../utils/db');
const TBL_CATEGORIES = 'courses';
const config = require('../config/default.json')
module.exports = {

    allCatType() {
        const sql = `SELECT distinct(CatType) FROM qlkh.categories`
        return db.load(sql);
    },

    allWithNew() {
        const sql = `
      select c.*, co.*, u.Name as TeacherName, ca.CatName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID join categories ca on ca.CatID = c.CatID
      where Datediff(CURRENT_DATE(), c.DateCreate) <=31
    `;
        return db.load(sql);
    },

    allWithOld() {
        return db.load(`select * from courses where Datediff(CURRENT_DATE(), DateCreate) > 31`);
    },

    updateOldCourses(entity){
        entity.BadgeNew = 0;
        const condition = {CourseID: entity.CourseID};
        return db.patch(entity,condition,'courses');
    },

    allWithView() {
        const sql = `
      select c.*, co.*, u.Name as TeacherName, ca.CatName
      from courses c join count co on c.CourseID = co.CourseID join users u on u.UserID = c.TeacherID join categories ca on ca.CatID = c.CatID
      order by co.ViewCount DESC
      limit 10
    `;
        return db.load(sql);
    },

    allWithOutstanding() {
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

    allWithWeb(offset) {
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

    allWithMobile(offset) {
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
        const sql = `
        SELECT c.*, co.*
        from courses c join count co on co.CourseID = c.CourseID
        where c.CourseID = ${id}
      `;
        const rows = await db.load(sql);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },

    async allOfTeacher(CourseID) {
        const rows = await db.load(`select * from courses where CourseID = ${CourseID}`);
        const teacherID = rows[0].TeacherID;
        const sql = `
        SELECT u.*, AVG(co.AvgStar) as Rating, SUM(StudentCount) as Students, SUM(Ratings) as Reviews, Count(c.CourseID) Courses 
        from users u join courses c on u.UserID = c.TeacherID join count co on co.CourseID = c.CourseID
        where u.UserID = ${teacherID}
        `;
        const rowteacher = await db.load(sql);
        return rowteacher[0];
    },

    allOfFeedback(id) {
        const sql = `
        SELECT fb.*, u.Name
        FROM feedback fb join courses c on fb.CourseID = c.CourseID join users u on u.UserID = fb.StudentID
        Where c.CourseID = ${id}
        `;
        return db.load(sql)
    },

    withCourseContent(id) {
        const sql = `
        SELECT cc.*
        from courses c join coursecontent cc on c.CourseID = cc.CourseID
        where c.CourseID = ${id}
        `;
        return db.load(sql);
    },

    async withRelateCourse(id) {
        const rows = await db.load(`select * from courses c join categories ca on c.CatID = ca.CatID where CourseID = ${id}`);
        const sql = `
        SELECT c.*, co.*,u.Name as TeacherName, ca.CatName
        FROM courses c left join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID 
        WHERE ca.CatType = ${rows[0].CatType} and c.CourseID != ${id}
        order by co.StudentCount DESC
        `;
        return db.load(sql);
    },

    bySearch(key, cat, sort_type, offset) {
        var sql;
        if (sort_type == "most-relevant") {
            sql = `
        SELECT c.*, co.*,u.Name as TeacherName, ca.CatName
        FROM courses c left join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID 
        WHERE MATCH(c.Name) AGAINST('${key}' IN BOOLEAN MODE) OR MATCH(ca.CatName) AGAINST('${cat}' IN BOOLEAN MODE)
        limit ${config.pagination.limit} offset ${offset}
      `;
        } else if (sort_type == "highest-rated") {
            sql = `
        SELECT c.*, co.*,u.Name as TeacherName, ca.CatName
        FROM courses c left join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID 
        WHERE MATCH(c.Name) AGAINST('${key}' IN BOOLEAN MODE) OR MATCH(ca.CatName) AGAINST('${cat}' IN BOOLEAN MODE)
        order by co.AvgStar DESC
        limit ${config.pagination.limit} offset ${offset}
      `;
        } else if (sort_type == "lowest-price") {
            sql = `
        SELECT c.*, co.*,u.Name as TeacherName, ca.CatName
        FROM courses c left join categories ca on c.CatID = ca.CatID join count co on co.CourseID = c.CourseID join users u on u.UserID = c.TeacherID 
        WHERE MATCH(c.Name) AGAINST('${key}' IN BOOLEAN MODE) OR MATCH(ca.CatName) AGAINST('${cat}' IN BOOLEAN MODE)
        order by c.Price ASC
        limit ${config.pagination.limit} offset ${offset}
      `;
        }
        return db.load(sql);
    },

    async countWithSearch(key, cat) {
        const rows = await db.load(`select count(*) as total FROM courses c left join categories ca on c.CatID = ca.CatID
    WHERE MATCH(c.Name) AGAINST('${key}' IN BOOLEAN MODE) OR MATCH(ca.CatName) AGAINST('${cat}' IN BOOLEAN MODE)`);
        return rows[0].total;
    },

    allwithmobile_admin() {
        sql = `select cour.*
    from categories cate join courses cour on cate.CatID=cour.CatID
    where cate.CatType=0`
        return db.load(sql);
    },
    allwithweb_admin() {
        sql = `select cour.*
    from categories cate join courses cour on cate.CatID=cour.CatID
    where cate.CatType=1`
        return db.load(sql);
    },

    del(entity) {
        const condition = { CourseID: entity.CourseID };
        return db.del(condition, TBL_CATEGORIES);
    },

    async updateViewCount(id){
        const rows = await db.load(`select * from count where CourseID = ${id}`);
        rows[0].ViewCount += 1;
        const condition = {CourseID: id};
        return db.patch(rows[0],condition,'count');
    },
    
    all() {
        return db.load(`select * from ${TBL_CATEGORIES}`);
    },

    add(entity) {
        return db.add(entity, TBL_CATEGORIES)
    },

    async singleid(id) {
        const rows = await db.load(`select * from ${TBL_CATEGORIES} where CourseID = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    patch(entity) {
        const condition = { CourseID: entity.CourseID };
        delete entity.CourseID;
        return db.patch(entity, condition, TBL_CATEGORIES);
    },
};