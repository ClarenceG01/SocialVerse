const { newUserValidator } = require("../validators/newUserValidator");
function newUserMiddleware(req, res, next) {
  let user = req.body;
  try {
    let { value } = newUserValidator(user);
    req.value = value;
    next();
  } catch (error) {
    res.send(error.message);
    next({ status: 400, message: error.message });
  }
}

module.exports = { newUserMiddleware };
