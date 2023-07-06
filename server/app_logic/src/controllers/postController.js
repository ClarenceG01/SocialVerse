async function getUserPosts(req, res, next) {
  try {
    res.send("Users all posts");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getUserPosts };
