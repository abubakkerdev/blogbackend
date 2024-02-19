const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogSchema = new Schema(
  { 
    title: {
      type: String,
      require: true,
    },
    description: { 
      type: String,
    },
    image: {
      type: String,
    },
    authId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    like: [{ type: String }],
    commentId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
