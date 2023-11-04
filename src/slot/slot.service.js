const eventModel = require("../event/event.model");
const APIError = require("../utils/error.class");
const slotModel = require("./slot.model");

class SlotService {
  async fetchAllSlots() {
    const slots = await slotModel.find();
    slots.forEach((item) => {
      const start = new Date(item.startTime);
      const end = new Date(item.endTime);
      item.startTime = `${start.getHours()}:${start.getMinutes()}`;
      item.endTime = `${end.getHours()}:${end.getMinutes()}`;
    });

    return slots;
  }

  async createOneSlot({
    venue,
    slotName,
    startTime,
    endTime,
    price,
    capacity,
  }) {
    const start = new Date();
    const startHrs = startTime.split(":")[0];
    const startMins = startTime.split(":")[1];
    const end = new Date();
    const endHrs = endTime.split(":")[0];
    const endMins = endTime.split(":")[1];

    start.setHours(startHrs);
    start.setMinutes(startMins);
    end.setHours(endHrs);
    end.setMinutes(endMins);
    console.log(start);
    console.log(end);
    const slot = new slotModel({
      venue,
      slotName,
      startTime: start,
      endTime: end,
      price,
      capacity,
      available: capacity,
    });
    const savedSlot = await slot.save();
    return savedSlot;
  }

  async deleteOneSlot(req) {
    const { eventId, slotId } = req.query;
    const event = await eventModel.findById(eventId);

    const slotArray = event.slot_id;

    const index = slotArray.indexOf(slotId);
    slotArray.splice(index, 1);

    event.slot_id = slotArray;
    await eventModel.findByIdAndUpdate(eventId, event);
    await slotModel.findByIdAndDelete(slotId);
  }

  async getEventSlot(eventId) {
    const data = await eventModel.findById(eventId).populate("slots");
    if (!data)
      throw new APIError(
        "event not found",
        "Invalid event id",
        400,
        "getEventSlot"
      );
    data.slots.forEach((item) => {
      const start = new Date(item.startTime);
      const end = new Date(item.endTime);
      item.startTime = `${start.getHours()}:${start.getMinutes()}`;
      item.endTime = `${end.getHours()}:${end.getMinutes()}`;
    });

    return data.slots;
  }
}

module.exports = new SlotService();
