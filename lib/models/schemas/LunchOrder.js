"user strict";

module.exports = function Order(mongoose) {
  var schema = new mongoose.Schema({
    created_at: {
      default: new Date(),
      desc: "The date at which the lunch order is created",
      type: Date
    },
    orders: [
      {
        desc: "A list of order ids attached to this lunch order",
        ref: "Order",
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  });

  return mongoose.model("LunchOrder", schema);
};
