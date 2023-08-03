const isAdmin = (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('/main-news/foryou');
  } else {
    next();
  }
};

module.exports = isAdmin;
