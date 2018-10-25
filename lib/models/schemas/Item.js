"user strict";

module.exports = function Item(mongoose) {
  var schema = mongoose.Schema({
    name: {
      desc: "The name of the item",
      required: true,
      trim: true,
      type: String
    },
    category: {
      desc: "The category of the item",
      type: String
    },
    price: {
      desc: "The price of the item",
      required: true,
      type: Number
    },
    deleted: {
      desc:
        "Deleted state of item, we don't want to actually remove it as our orders will get corrupt then",
      required: true,
      type: Boolean,
      default: false
    }
  });

  return mongoose.model("Item", schema);
};
