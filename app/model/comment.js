const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  { 
    descripition: {
      type: String,
      require: true,
    },
    authId: { 
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
