const ROLE_ENUM = require("../utils/constants");
const authHandler = require("../utils/middleware/auth.middleware");
const bookingController = require("./booking.controller");

const router = require("express").Router();

router.get("/", 
authHandler(), 
bookingController.getBookings);
router.post(
  "/",
  authHandler([ROLE_ENUM.PUBLIC]),
  bookingController.createBooking
);
router.post("/cancel", authHandler(), bookingController.cancelBooking);



module.exports = router;
