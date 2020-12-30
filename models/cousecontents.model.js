const db = require('../utils/db');
const TBL_CATEGORIES = 'cousecontents';
const config = require('../config/default.json')
module.exports = {
    add(entity) {
        return db.add(entity, TBL_CATEGORIES)
    },
}