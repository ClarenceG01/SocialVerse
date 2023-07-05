const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const createMarkup = require("../utils/createMarkup");
const sendMail = require("../utils/sendMail");
const { getUserByEmail } = require("../utils/getUserByEmail");
const { getUserByUsername } = require("../utils/getUserByUsername");

// Register
async function userRegister(req, res) {
  try {
    let user = req.body;
    let encrypted_password = await bcrypt.hash(user.password, 8);

    let pool = req.pool;
    if (pool.connected) {
      let results = await pool
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
    res.send(error);
    console.log(error);
  }
}
async function userLogin(req, res) {
  let { email, username, password } = req.body;

  let pool = req.pool;
  try {
    if (email == undefined) {
      let results = await getUserByUsername(username, pool);
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
    } else if (username == undefined) {
      let results = await getUserByEmail(email, pool);
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
    }
  } catch (error) {
    console.log(error);
  }
}
async function userLogout(req, res) {
  console.log(req.pool.connected);
  try {
    req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { userRegister, userLogin, userLogout };
