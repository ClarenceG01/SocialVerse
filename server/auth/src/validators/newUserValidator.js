const { registerSchema } = require("../schema/userSchema");

function newUserValidator(body) {
  let user = registerSchema.validate(body);

  if (user.error?.details.length > 0) {
    let message = user.error.details.map((err) => err.message);

    throw new Error(message.join("\n"));
  } else {
    return user;
  }
}

module.exports = { newUserValidator };
