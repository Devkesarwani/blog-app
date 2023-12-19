const Blog = require("../models/BlogSchema");

module.exports.journalPost = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
    });
    const addBlog = await blog.save();
    console.log(addBlog);
    res.redirect("/compose")
  } catch (error) {
    console.log(error);
  }
};
