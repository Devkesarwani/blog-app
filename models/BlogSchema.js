const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Field can't empty, required!"],
  },
  content: {
    type: String,
    required: [true, "Content Field can't empty, required!"],
  },
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
