const authHandler = require("../utils/middleware/auth.middleware");
const slotController = require("./slot.controller");
const slotValidation = require("./slot.validation");
const ROLE_ENUM = require("../utils/constants");
const router = require("express").Router();

router.get("/", authHandler([ROLE_ENUM.ADMIN]), slotController.getSlots);
router.get("/event", authHandler(), slotController.getSlotsForEvent);
router.post(
  "/",
  authHandler([ROLE_ENUM.ADMIN]),
  slotValidation.validateSlot,
  slotController.createSlot
);

router.delete("/", authHandler([ROLE_ENUM.ADMIN]), slotController.deleteSlot);

module.exports = router;
