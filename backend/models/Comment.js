let mongoose = require("mongoose");

let CommentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: String,
    text: String,
    date: String,
  },
  { collection: "comment" }
);

module.exports = mongoose.model("Comment", CommentSchema);
