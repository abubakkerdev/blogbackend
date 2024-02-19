const blogPost = require("../../model/blogPost");
const fs = require("node:fs");

const blogController = {
  blogCreate(req, res) {
    const { title, description, authId } = req.body;

    const blog = new blogPost({
      title,
      description,
      image: req.file.filename,
      authId,
    });

    blog.save();

    res.send({
      success: "blog create",
    });
  },

  async blogUpdate(req, res) {
    const { blogId, descTwo, image_name, titleTwo } = req.body;

    if (image_name) {
      fs.unlinkSync("./public/images/" + image_name);
    }

    const updateBlog = await blogPost.findByIdAndUpdate(
      {
        _id: blogId,
      },
      {
        title: titleTwo,
        description: descTwo,
        image: req.file.filename,
      },
      {
        new: true,
      }
    );

    res.send({
      success: "ok",
      data: updateBlog,
    });
  },

  async blogAll(req, res) {
    const allBlog = await blogPost.find({});

    res.send({
      data: allBlog,
    });
  },
  async singleBlog(req, res) {
    const { id } = req.params;
    const allBlog = await blogPost.find({ _id: id });
    res.send({
      success: "ok",
      data: allBlog[0],
    });
  },
  async homeBlog(req, res) {
    const allBlog = await blogPost.find({}).populate({
      path: "authId",
      select: "_id uname image",
    });

    res.send({
      success: "ok",
      data: allBlog,
    });
  },
  async singleBlogs(req, res) {
    const { id } = req.params;

    const allBlog = await blogPost.find({ _id: id }).populate({
      path: "commentId",
      select: "_id descripition authId",

      populate: {
        path: "authId",
        select: "_id uname image",

      },
    })
    


    res.send({
      success: "ok",
      data: allBlog[0],
    });
  },
};

module.exports = blogController;
