module.exports = function auth(req, res, next) {
  if (req.session.isAuth === false) {
    req.session.retUrl = req.originalUrl;
    return res.redirect('/account/login');
  }

  if(req.session.isAuth && req.session.authUser.Permission !== 2){
    req.session.isAuth = false;
    req.session.authUser = null;
    return res.redirect('/');
  }

  next();
}