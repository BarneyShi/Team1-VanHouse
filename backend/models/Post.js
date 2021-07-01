let mongoose = require("mongoose");

let PostSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    date: String,
    title: String,
    price: String,
    images: Array,
    author: String,
    authorID: String,
    address: String,
    postalCode: String,
    phone: String,
    email: String,
    leaseLength: String,
    paymentPeriod: String,
    bedrooms: String,
    bathrooms: String,
    sqft: String,
    utilities: Boolean,
    laundry: Boolean,
    pets: Boolean,
    furnished: Boolean,
    schedule: Array,
    comment: Array,
    rating: Array,
  },
  {
    collection: "post",
  }
);

module.exports = mongoose.model("Post", PostSchema);
