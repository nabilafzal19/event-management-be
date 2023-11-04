const express = require("express");
const ROLE_ENUM = require("../utils/constants");
const eventValidation = require("./event.validation");
const authHandler = require("../utils/middleware/auth.middleware");
const upload = require("../utils/multer.config");
const {
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  eventCategory,
  featuredEvents,
  exploreEvents,
  searchForEvent,
  uploadImageForEvent,
} = require("./event.controller");

const router = express.Router();
router.get("/getallEvents", getAllEvents);
router.get("/eventCategory",authHandler(), eventCategory);
router.get("/featuredEvents", authHandler(),featuredEvents);
router.get("/search", searchForEvent);
router.post(
  "/upload",
  authHandler([ROLE_ENUM.ADMIN]),
  upload.single("image"),
  uploadImageForEvent
);
router.post(
  "/createEvent",
  authHandler([ROLE_ENUM.ADMIN]),
  eventValidation.validateEvent,
  createEvent
);
router.delete("/deleteEvent", authHandler([ROLE_ENUM.ADMIN]), deleteEvent);
router.put("/updateEvent", authHandler([ROLE_ENUM.ADMIN]), updateEvent);
router.get("/explore", authHandler(), exploreEvents);

module.exports = router;
