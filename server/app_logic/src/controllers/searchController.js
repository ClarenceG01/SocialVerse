async function search(req, res, next) {
  try {
    const { pool } = req;
    const { searchTerm } = req.params;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("searchTerm", searchTerm)
        .execute("SearchUsersByUsernameAndFullname");
      res.status(200).json({
        success: true,
        message: "Search results retrieved",
        results: results.recordset,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { search };
