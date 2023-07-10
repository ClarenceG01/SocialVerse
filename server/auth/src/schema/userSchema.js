const joi = require("joi");

const registerSchema = joi.object({
  full_name: joi.string().min(5).max(45).required(),
  email: joi.string().email({ tlds: { allow: false } }),
  username: joi.string().min(5).max(45).required(),
  bio: joi.string().min(5).max(150).required(),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),
  c_password: joi.ref("password"),
  profile_picture: joi.string().min(0).max(1500).default("default.png"),
});

module.exports = { registerSchema };
