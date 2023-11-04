const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
  numberOfTickets: { type: Number, default: 1 },
});

module.exports = mongoose.model("booking", bookingSchema);
