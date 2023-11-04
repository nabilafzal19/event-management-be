const bookingService = require("./booking.service");

class BookingController {
  async createBooking(req, res, next) {
    try {
      const { eventId, slotId, numberOftickets } = req.body;
      const booking = await bookingService.createOneBooking(
        req.user.id,
        eventId,
        slotId,
        numberOftickets
      );
      res.json({ success: true, data: booking });
    } catch (err) {
      next(err);
    }
  }
  async getBookings(req, res, next) {
    try {
      const userId = req.user.id;
      const bookings = await bookingService.getUserBooking(userId);
      res.json({ success: true, data: bookings });
    } catch (err) {
      next(err);
    }
  }
  async cancelBooking(req, res, next) {
    const { bookingId } = req.body;

    try {
      const event = await bookingService.deleteBooking(bookingId, req.user.id);
      res.json({ success: true, data: event });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookingController();
