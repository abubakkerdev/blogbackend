
const blogPost = require("../model/blogPost");
const fs = require("node:fs");
const commentModel = require("../model/comment");

const workSocket = (io, socket) => {
  socket.on("some", function (info) {
    console.log("show some thing", info);
  });

  socket.on("blogEdit", async function (id) {
    let blog = await blogPost.find({ _id: id });

    socket.emit("editBlog", blog[0]);
  });

  socket.on("blogDelete", async (id) => {
    // console.log(id);
    let blog = await blogPost.find({ _id: id });

    if (blog[0].image) {
      fs.unlinkSync("./public/images/" + blog[0].image);
    }

    let deleteBlog = await blogPost.findByIdAndDelete({ _id: blog[0]._id });

    console.log("obj", deleteBlog);
    socket.emit("deleteBlog", deleteBlog);
  });

  socket.on("blogLike", async (data) => {
    let blog = await blogPost.find({ _id: data.blogId });

    // console.log(data, blog[0].like.includes(data.authId));

    if (blog[0].like.includes(data.authId)) {
      let likeArr = [...blog[0].like];

      likeArr.splice(likeArr.indexOf(data.authId), 1);

      let blogUpdate = await blogPost.findByIdAndUpdate(
        { _id: data.blogId },
        {
          like: likeArr,
        },
        { new: true }
      );

        socket.emit("likeBlog", blogUpdate)

    } else {
      let blogUpdate = await blogPost.findByIdAndUpdate(
        { _id: data.blogId },
        {
          $push: {
            like: data.authId,
          },
        },
        { new: true }
      );

      socket.emit("likeBlog", blogUpdate)

    }
  });


  socket.on("addComment", async ({comment,authId, id}) => {


    const commentAdd = new commentModel({
      descripition: comment,
      authId,
      postId: id,
    })

    commentAdd.save();


    const updateBlog = await blogPost.findByIdAndUpdate({
      _id: id
    }, {
      $push: {
        commentId: commentAdd._id
      }
    });

    const allComment = await commentModel.find({postId: id}).populate({path: "authId", select: "_id uname image"});

    socket.emit("commentAdd", allComment);



  });


};

module.exports = workSocket;
