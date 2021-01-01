module.exports = function unAuth(req, res, next) {
    if (req.session.isAuth === true) {
      return res.redirect('/');
    }
  
    next();
  }