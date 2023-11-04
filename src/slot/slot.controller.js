const slotService = require("./slot.service");

class SlotController {
  async getSlots(req, res, next) {
    try {
      const slots = await slotService.fetchAllSlots();
      res.json({ success: true, data: { slots } });
    } catch (err) {
      next(err);
    }
  }
  async createSlot(req, res, next) {
    try {
      console.log(req.user);
      const slot = await slotService.createOneSlot(req.body);
      res.send({ success: true, data: { slot } });
    } catch (err) {
      next(err);
    }
  }
  async deleteSlot(req, res, next) {
    try {
      await slotService.deleteOneSlot(req);
      res
        .status(200)
        .send({ success: true, data: "slot deleted Successfully" });
    } catch (err) {
      next(err);
    }
  }
  async getSlotsForEvent(req, res, next) {
    try {
      const data = await slotService.getEventSlot(req.query.id);
      res.json({ success: true, data: data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SlotController();
