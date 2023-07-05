async function getUserByUsername(username, pool) {
  try {
    if (pool.connected) {
      let results = await pool
        .request()
        .input("username", username)
        .execute("GetUserByUsername");
      console.log(results);
      return results.recordset[0];
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserByUsername };
