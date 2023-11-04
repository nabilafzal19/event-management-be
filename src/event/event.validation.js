const joi = require("joi");
const APIError = require("../utils/error.class");

const eventSchema = joi.object({
    eventName:joi.string().required(),
    slots:joi.array().required(),
    eventDescription:joi.string().required(),
    eventCategory:joi.string().lowercase().valid('sports','movies & theatre','music','art'),
    eventVenue:joi.string().required(),
    eventDate:joi.string().required(),
    featuredEvents:joi.boolean(),
    eventFeatureImage: joi.string(),
})

const checkError = (value) => {
  if (value.error)
    throw new APIError(
      "validation Error",
      value.error.message,
      400,
      "validateEvent"
    );
};

class validate {
  validateEvent(req, res, next) {
    try {
      const value = eventSchema.validate(req.body);
      checkError(value);
      next();
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new validate();
