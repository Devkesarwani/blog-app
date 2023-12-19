const Blog = require("../models/BlogSchema");

module.exports.getJournals = async (req, res) => {
  try {
    const isAuthenticated = res.locals.user ? true : false;

    let posts;
    if (isAuthenticated) {
      posts = await Blog.find({});
    } else {
      posts = await Blog.find({}).limit(5);
    }

    if (posts && posts.length > 0) {
      res.render("journals", { posts, isAuthenticated });
    } else {
      res.render("post", { title: "Oops! 😵", content: "Nothing to show" });
    }
  } catch (error) {
    console.error("Error fetching journals:", error);
    res.render("error", { error });
  }
};

module.exports.uniquePost = async (req, res) => {
  const requestId = req.params.postId;

  try {
    const post = await Blog.findOne({ _id: requestId });

    if (post) {
      res.render("post", { title: post.title, content: post.content });
    } else {
      res.render("post", { title: "Oops! 😵", content: "Nothing to show" });
    }
  } catch (error) {
    console.error("Error fetching unique post:", error);
    res.render("error", { error });
  }
};
