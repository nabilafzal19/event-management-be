const eventService = require("./event.service");
const {
  fetchByEventCategory,
  fetchByFeaturedEvent,
} = require("./event.service");
const createEvent = async (req, res, next) => {
  try {
    
   
       const event = await eventService.createOneEvent(req)
        res.status(201).send({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const allDetails = await eventService.fetchAllEvent();
    res.status(200).send({ success: true, eventData: allDetails });
  } catch (err) {
    next(err);
  }
};

const eventCategory = async (req, res, next) => {
  try {
    const { eventCategory } = req.body;
    const events = await fetchByEventCategory(eventCategory);
    res.status(200).send({ success: true, eventData: events });
  } catch (err) {
    next(err);
  }
};
const featuredEvents = async (req, res, next) => {
  try {
    const events = await fetchByFeaturedEvent();

    res.status(200).send({ success: true, eventData: events });
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const updatedData = await eventService.updateOneEvent(req);
    return res.status(200).send({
      success: true,
      Event: updatedData.updatedEvent,
      Slot: updatedData.updatedSlot,
    });
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const deletedEvent = await eventService.deleteOneEvent(req);
    res.status(200).send({
      success: true,
      message: "event deleted Successfully",
      eventDeleted: deleteEvent,
    });
  } catch (err) {
    next(err);
  }
};
const exploreEvents = async (req, res, next) => {
  try {
    const featured = await fetchByFeaturedEvent();
    const bestShows = await eventService.fetchBestShows();
    const music = await eventService.fetchByEventCategory("music");

    const payload = {
      featured: featured,
      bestEvents: bestShows,
      musicEvents: music,
    };
    res.json({ success: true, data: payload });
  } catch (err) {
    next(err);
  }
};

const searchForEvent = async (req, res, next) => {
  const search = req.query.search;
  try {
    const events = await eventService.getEventBySearch(search);
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

const uploadImageForEvent = async (req, res, next) => {
  const { file } = req;
  const eventId = req.query.id;
  try {
    const event = await eventService.uploadImageforEvent(file, eventId);
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  eventCategory,
  featuredEvents,
  exploreEvents,
  searchForEvent,
  uploadImageForEvent,
};
