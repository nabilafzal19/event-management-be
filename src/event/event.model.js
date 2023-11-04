const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: String,
  },
  slots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],

  eventCategory: {
    type: String,
    enum: ["sports", "movies & theatre", "music", "art"],
  },

  featuredEvents: {
    type: Boolean,
    default: false,
  },

  eventDescription: {
    type: String,
  },

  eventVenue: {
    type: String,
  },
  eventFeatureImage: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
