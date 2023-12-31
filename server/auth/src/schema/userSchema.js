const joi = require("joi");

const registerSchema = joi.object({
  full_name: joi.string().min(5).max(45).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  username: joi.string().min(5).max(20).required(),
  bio: joi.string().min(0).max(150),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),
  c_password: joi.ref("password"),
  profile_picture: joi
    .string()
    .min(0)
    .max(1500)
    .default(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&usqp=CAU"
    ),
});

module.exports = { registerSchema };
