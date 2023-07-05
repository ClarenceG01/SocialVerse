const mssql = require("mssql");
const config = require("../config/config");

async function getUserByUsername(username) {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("username", username)
        .execute("GetUserByUsername");
      console.log(results);
      return results.recordset[0];
    }
  } catch (error) {
    console.log(error.originalError.info.message);
  }
}

module.exports = { getUserByUsername };
