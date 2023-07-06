async function getUserByEmail(email, pool) {
  try {
    if (pool.connected) {
      let results = await pool
        .request()
        .input("email", email)
        .execute("GetUserByEmail");
      return results.recordset[0];
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserByEmail };
