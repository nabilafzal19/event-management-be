const router = require("express").Router();
const UserRouter = require("./user/user.route");
const SlotRouter = require("./slot/slot.route");


const BookingRouter = require("./booking/booking.route");
const eventRouter = require("../src/event/event.route");

router.use("/user/admin/event", eventRouter);
router.use("/users", UserRouter);
router.use("/slots", SlotRouter);

router.use("/booking", BookingRouter);
// router.use("/user/admin/event", router);
// app.use("/ems.antino.ca", router);
module.exports = router;
