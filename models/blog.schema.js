const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    image: String,
})

const BlogDb = mongoose.model("blogTbl", blogSchema)

module.exports = BlogDb