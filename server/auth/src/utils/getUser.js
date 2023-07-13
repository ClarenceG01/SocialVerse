async function getUser(email, username, pool) {
  try {
    if (pool.connected) {
      let results = await pool
        .request()
        .input("email", email)
        .input("username", username)
        .query(
          "SELECT * FROM [user] WHERE email = @email OR username = @username"
        );
      return results.recordset[0];
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUser };
