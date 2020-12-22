const db = require('../utils/db');

const TBL_CATEGORIES = 'categories';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_CATEGORIES}`);
  },

  allWithTop() {
    const sql = `
      select ca.*, count(ID) as OrderCount
      from orders o join orderdetails od on o.OrderID = od.OrderId join courses co on co.CourseID = od.CourseID join categories ca on ca.CatID = co.CatID
      where Datediff(CURRENT_DATE(), o.OrderDate) < 7
      group by CatID, CatName
      order by OrderCount desc
      limit 6
    `;
    return db.load(sql);
  },
  
  // allWithDetails() {
  //   const sql = `
  //     select c.*, count(p.ProID) as ProductCount
  //     from categories c left join products p on c.CatID = p.CatID
  //     group by c.CatID, c.CatName
  //   `;
  //   return db.load(sql);
  // },

  // async single(id) {
  //   const rows = await db.load(`select * from ${TBL_CATEGORIES} where CatID = ${id}`);
  //   if (rows.length === 0)
  //     return null;

  //   return rows[0];
  // },

  // add(entity) {
  //   return db.add(entity, TBL_CATEGORIES)
  // },

  // del(entity) {
  //   const condition = { CatID: entity.CatID };
  //   return db.del(condition, TBL_CATEGORIES);
  // },

  // patch(entity) {
  //   const condition = { CatID: entity.CatID };
  //   delete entity.CatID;
  //   return db.patch(entity, condition, TBL_CATEGORIES);
  // }
};
