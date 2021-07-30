let mongoose = require("mongoose");

let ScheduleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    users: Array,
    date: String,
  },
  {
    collection: "schedule",
  }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
