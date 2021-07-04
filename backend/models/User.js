let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    posts: Array,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    upvote: Array,
    downvote: Array,
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", UserSchema);
