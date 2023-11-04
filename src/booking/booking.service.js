const BookingModel = require("./booking.model");
const slotModel = require("../slot/slot.model");
const userModel = require('../user/user.model');
const APIError = require("../utils/error.class");

class BookingService {
  async createOneBooking(userId, eventId, slotId, numberOfTickets) {
    const slot = await slotModel.findById(slotId);
    if (!slot)
      throw new APIError(
        "invalid slot",
        "Invalid slot selected",
        400,
        "createOneBooking"
      );
    if (slot.available < numberOfTickets)
      throw new APIError(
        "capacity exceeded",
        "No more bookings possible",
        400,
        "createOneBooking"
      );
    slot.available = slot.available - numberOfTickets;
    await slot.save();
    const bookings = await BookingModel.create({
      userId,
      eventId,
      numberOfTickets,
      slotId,
    });
    return bookings;
  }
  async getUserBooking(userID) {
    const bookings = await BookingModel.find({ userId: userID })
      .populate("eventId")
      .populate("slotId");
    return bookings;
  }
  async deleteBooking(bookingId, userId) {
    const booking = await BookingModel.findById(bookingId);
    if (!booking.userId === userId)
      throw new APIError(
        "invalid booking",
        "Invalid booking",
        400,
        "deleteBooking"
      );
    const slot = await slotModel.findById(booking.slotId);
    slot.available = slot.available - 1;
    await slot.save();
    await BookingModel.findByIdAndDelete(bookingId);
    return "Booking Canceled";
  }
}

module.exports = new BookingService();
