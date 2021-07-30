let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
    {
        // id: {
        //     type: String,
        //     required: true,
        //     unique: true,
        // },
        posts: Array,
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        password: {type: String, required: true},
        upvote: Array,
        downvote: Array,
        admin: {
            type: Boolean,
            default: false
        },
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", UserSchema);
