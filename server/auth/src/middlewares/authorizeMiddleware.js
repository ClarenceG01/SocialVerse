function authorizeSession(req, res, next) {
  const authorized = req.session?.authorized;
  if (req.session.user && authorized) {
    next();
  } else {
    res.status(401).json({ message: "Log in" });
  }
}
module.exports = { authorizeSession };
