const bcrypt = require("bcrypt");
const createMarkup = require("../utils/createMarkup");
const sendMail = require("../utils/sendMail");
const { getUser } = require("../utils/getUser");

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
      if (results.rowsAffected[0] > 0) {
        res.status(200).json({ message: "User created successfully" });
      }
    }
  } catch (error) {
    res.send(error);
    console.log(error.originalError.info.message);
  }
}
async function userLogin(req, res) {
  let { email, username, password } = req.body;
  console.log(req.body);
  let pool = req.pool;
  try {
    // if (email == null || email == undefined) {
    //   let results = await getUserByUsername(username, pool);
    //   let is_match = await bcrypt.compare(password, results.password);
    //   if (is_match) {
    //     req.session.authorized = true;
    //     req.session.user = results;
    //     res.status(200).json({
    //       message: "Login successful",
    //       results: [req.session, req.sessionID],
    //     });
    //   } else {
    //     res.status(401).json({ message: "Login failed" });
    //   }
    // } else if (username == null || username == undefined) {
    //   let results = await getUserByEmail(email, pool);
    //   let is_match = await bcrypt.compare(password, results.password);
    //   if (is_match) {
    //     req.session.authorized = true;
    //     req.session.user = results;
    //     res.status(200).json({
    //       message: "Login successful",
    //       results: [req.session, req.sessionID],
    //     });
    //   } else {
    //     res.status(401).json({ message: "Login failed" });
    //   }
    // }

    if (pool.connected) {
      let results = await getUser(email, username, pool);
      if (results?.originalError?.info?.message) {
        res.status(404).json({ message: "User not found" });
      } else {
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
    } else {
      res.status(500).json({ message: "Server error" });
    }
  } catch (error) {
    console.log(`error at controller :${error}`);
  }
}
async function deleteAccount(req, res, next) {
  try {
    const { pool } = req;
    const user_id = req.session?.user.user_id;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .execute("deleteAccount");
      if (results.rowsAffected[0] > 0) {
        res.status(200).json({
          success: true,
          message: "Account deleted",
        });
        req.session.destroy();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function userLogout(req, res) {
  let { password } = req.body;
  console.log(req.pool.connected);
  try {
    const passwordFromSession = req.session.user.password;
    const is_match = await bcrypt.compare(password, passwordFromSession);
    if (is_match) {
      req.session.destroy();
      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { userRegister, userLogin, userLogout, deleteAccount };
