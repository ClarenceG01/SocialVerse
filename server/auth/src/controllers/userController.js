const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const createMarkup = require("../utils/createMarkup");
const sendMail = require("../utils/sendMail");
const { getUserByEmail } = require("../utils/getUserByEmail");
const session = require("express-session");

async function userRegister(req, res) {
  try {
    let user = req.body;
    let encrypted_password = await bcrypt.hash(user.password, 8);
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("full_name", user.full_name)
        .input("email", user.email)
        .input("username", user.username)
        .input("bio", user.bio)
        .input("password", encrypted_password)
        .input("profile_picture", user.profile_picture)
        .execute("CreateUser");

      let html = await createMarkup("./src/view/mail.ejs", {
        Name: user.full_name,
        text: `Welcome to SocialVerse! Get ready to connect, discover, and share. Explore exciting content, connect with friends and family, and engage in meaningful discussions. We're here to help. Reach out through the Help Center or reply to this email. Enjoy your time on SocialVerse!`,
      });
      const message = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Welcome to SocialVerse!",
        html: html,
      };
      await sendMail(message);
      res.json(`user ${user.username} added`);
    }
  } catch (error) {
    res.send(error.originalError.info.message);
    console.log(error.originalError.info.message);
  }
}
async function userLogin(req, res) {
  let { email, password } = req.body;
  try {
    let results = await getUserByEmail(email);
    let is_match = await bcrypt.compare(password, results.password);
    if (is_match) {
      req.session.authorized = true;
      req.session.user = results;
      res.status(200).json({
        message: "Login successful",
        results: [req.session, req.sessionID],
      });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
}
async function userLogout(req, res) {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { userRegister, userLogin, userLogout };
