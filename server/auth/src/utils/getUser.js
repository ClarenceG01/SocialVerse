async function getUser(email, username, pool) {
  try {
    if (pool.connected) {
      let results = await pool
        .request()
        .input("Username", username)
        .input("Email", email)
        .execute("getUser");
      let user = results.recordset[0];
      // console.log(results.recordset[0]);

      return user;
    }
  } catch (error) {
    console.log(`from getauser:${error}`);
    return error;
  }
}

module.exports = { getUser };
