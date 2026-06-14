const protect = (req, res, next) => {
  // Auth0 authentication will be added later.
  req.user = null;
  next();
};

module.exports = {
  protect,
};