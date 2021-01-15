const db = require('../utils/db');
const TBL_COURSES = 'courses';
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

    updateOldCourses(entity) {
        entity.BadgeNew = 0;
        const condition = { CourseID: entity.CourseID };
        return db.patch(entity, condition, 'courses');
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

    async countWithByCatID(categories) {
        const rows = await db.load(`SELECT count(*) as total from courses c join categories ca on c.CatID = ca.CatID where ca.CatID = '${categories}'`);
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

    async singleByUser(courseID, userID) {
        const sql = `
        SELECT *
        FROM orders o join orderdetails od on o.OrderID = od.OrderID
        where CourseID = ${courseID} and UserID = ${userID}
        `;
        const rows = await db.load(sql);
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

    async singleRegister(courseID, userID) {
        const rows = await db.load(`SELECT * FROM orders o join orderdetails od on o.OrderID = od.OrderID where CourseID = ${courseID} and UserID = ${userID}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    allRegister(userID) {
        return db.load(`SELECT c.*,u.Name as TeacherName,co.*,od.IsFav FROM orders o join orderdetails od on o.OrderID = od.OrderID join courses c 
        on c.CourseID = od.CourseID join users u on u.UserID = c.TeacherID join count co on co.CourseID = c.CourseID where o.UserID = ${userID}`);
    },

    allRegisterWithProgress(userID) {
        return db.load(`SELECT c.*,u.Name as TeacherName,co.*,od.IsFav FROM orders o join orderdetails od on o.OrderID = od.OrderID join courses c 
        on c.CourseID = od.CourseID join users u on u.UserID = c.TeacherID join count co on co.CourseID = c.CourseID where o.UserID = ${userID}`);
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
        return db.del(condition, TBL_COURSES);
    },

    async updateViewCount(id) {
        const rows = await db.load(`select * from count where CourseID = ${id}`);
        rows[0].ViewCount += 1;
        const condition = { CourseID: id };
        return db.patch(rows[0], condition, 'count');
    },

    async updateFav(entity, isFav) {
        const rows = await db.load(`select * from orderdetails where OrderID = ${entity.OrderID} and CourseID = ${entity.CourseID}`);
        rows[0].IsFav = isFav;

        const condition = {
            ID: rows[0].ID
        }

        return db.patch(rows[0], condition, 'orderdetails');
    },

    all() {
        return db.load(`select * from ${TBL_COURSES}`);
    },

    add(entity) {
        return db.add(entity, TBL_COURSES)
    },

    async singleid(id) {
        const rows = await db.load(`select * from ${TBL_COURSES} where CourseID = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    patch(entity) {
        const condition = { CourseID: entity.CourseID };
        delete entity.CourseID;
        return db.patch(entity, condition, TBL_COURSES);
    },

    allcoursesofteacher(UserID) {
        return db.load(`select *
        from ${TBL_COURSES} c 
        where  c.TeacherID=${UserID}`);
    },

    bestseller() {
        sql = `SELECT c.*
        FROM count co join courses c on co.CourseID = c.CourseID
        order by StudentCount DESC
        limit 5`
        return db.load(sql);
    },

    updateBestSeller(entity) {
        entity.BadgeBestSeller = 1;
        const condition = { CourseID: entity.CourseID };
        return db.patch(entity, condition, 'courses');
    },

    async updateStudentCount(id) {
        const rows = await db.load(`select * from count where CourseID = ${id}`);
        rows[0].StudentCount += 1;
        const condition = { CourseID: id };
        return db.patch(rows[0], condition, 'count');
    },

    async singleByCount(id) {
        const rows = await db.load(`select * from count where CourseID = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    UpdateStarRating(entity) {
        const condition = { CourseID: entity.CourseID };
        return db.patch(entity, condition, 'count');
    },

    add_count(entity) {
        return db.add(entity, 'count')
    },

    del_count(entity) {
        const condition = { CountID: entity.CountID };
        return db.del(condition, 'count');
    },

    async singleid_count_bycourID(id) {
        const rows = await db.load(`select * from count where CourseID = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    allDone(userID, CourseID){
        const sql = `
        SELECT * FROM learn_progress where StudentID = ${userID} and CourseID = ${CourseID} and Status = 1
        `;
        return db.load(sql);
    },

    async singleProgress(userID, CourseID, Index){
        const rows = await db.load(` SELECT * FROM learn_progress lp where StudentID = ${userID} and CourseID = ${CourseID} and lp.Index = ${Index}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    updateProgressStatus(entity) {
        const condition = { ID: entity.ID };
        return db.patch(entity, condition, 'learn_progress');
    },

    addProgress(entity) {
        return db.add(entity, 'learn_progress');
    },
};