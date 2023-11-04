const mongoose = require("mongoose");
const slotSchema = mongoose.Schema({
  slotName: {
    type: String,
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
  },
  venue: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Slot", slotSchema);
