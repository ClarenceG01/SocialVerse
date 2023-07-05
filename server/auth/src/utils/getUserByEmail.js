const mssql = require("mssql");
const config = require("../config/config");

async function getUserByEmail(email) {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("email", email)
        .execute("GetUserByEmail");
      console.log(results);
      return results.recordset[0];
    }
  } catch (error) {
    console.log(error.originalError.info.message);
  }
}

module.exports = { getUserByEmail };
