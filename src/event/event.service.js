const eventModel = require("./event.model");
const Event = require("./event.model");
const Slot = require("../slot/slot.model");
const APIError = require("../utils/error.class");
const bookingModel = require("../booking/booking.model");
class eventService {
  async fetchAllEvent() {
    const eventDetails = await Event.find({});
    if (!eventDetails) {
      throw new APIError(
        "Event invalid",
        "No Event Exists",
        404,
        "fetchAllEvent"
      );
    }
    const allDetails = [];
    const eventSize = eventDetails.length;
    for (let i = 0; i < eventSize; i++) {
      const value = await Event.findById(eventDetails[i].id).populate("slots");

      allDetails.push(value);
    }
    return allDetails;
  }

  async fetchByEventCategory(eventCategory) {
    const events = await Event.find({ eventCategory });
    return events;
  }
  async fetchByFeaturedEvent() {
    const events = await Event.find({ featuredEvents: true });
    console.log(events);
    return events;
  }
  async createOneEvent(req) {
    const {
      eventName,
      eventDescription,
      eventCategory,
      slots,
      eventDate,
      eventVenue,
      featuredEvents,
      eventFeatureImage,
    } = req.body;
    console.log(req.file);
    const event = await Event.create({
      eventName,
      eventDate,
      slots,
      eventDescription,
      eventCategory,
      eventVenue,
      eventFeatureImage,
      featuredEvents,
    });
    return event;
  }

  async updateOneEvent(req) {
    const { eventId, slotId } = req.query;
    // console.log(req.query)

    const eventExists = await Event.findById(eventId);
    const slotExists = await Slot.findById(slotId);

    if (!eventExists)
      throw new APIError(
        "Event invalid",
        "No Event Exists",
        400,
        "updateOneEvent"
      );
    const updateEvent = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body);
    const updatedSlot = await Slot.findByIdAndUpdate(slotExists, req.body);

    return { updatedEvent, updatedSlot };
  }

  async deleteOneEvent(req) {
    const { eventId } = req.query;
    const eventExists = await Event.findById(eventId);
    if (!eventExists)
      throw new APIError(
        "Event invalid",
        "No Event Exists",
        400,
        "deleteOneEvent"
      );

    const user = await Event.findByIdAndDelete(eventId);
    return user;
  }

  async fetchBestShows() {
    const data = await bookingModel
      .aggregate([{ $group: { _id: "$eventId", tickets: { $sum: 1 } } }])
      .limit(5)
      .sort({ tickets: "desc" })
      .lookup({
        from: "events",
        localField: "_id",
        foreignField: "_id",
        as: "eventDetails",
      });
    // const events = await
    // const event = data
    return data;
  }

  async getEventBySearch(search) {
    const events = await eventModel
      .find({
        eventName: { $regex: search, $options: "i" },
      })
      .populate("slots");

    return events;
  }

  async uploadImageforEvent(image, eventId) {
    const event = await eventModel.findById(eventId);
    if (!event)
      throw new APIError(
        "no such event",
        "Invalid event ID",
        400,
        "uploadImageforEvent"
      );
    // console.log(image);
    event.eventFeatureImage = image.location;
    const saved = await event.save();

    return saved;
  }
}

module.exports = new eventService();
