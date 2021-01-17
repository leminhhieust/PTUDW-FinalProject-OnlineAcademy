module.exports = function auth(req, res, next) {
  if(req.session.isAuth && req.session.authUser.Permission !== 2){
      req.session.isAuth = false;
      req.session.authUser = null;
      return res.redirect('/');
  }

  next();
}