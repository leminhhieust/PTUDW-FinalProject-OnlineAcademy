module.exports = function auth(req, res, next) {
  if(req.session.isAuth && req.session.authUser.Permission !== 0){
      req.session.isAuth = false;
      req.session.authUser = null;
      return res.redirect('/admin');
  }

  next();
}