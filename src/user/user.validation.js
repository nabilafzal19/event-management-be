const joi = require("joi");
const APIError = require("../utils/error.class");

const registerSchema = joi.object({
  firstName: joi.string().alphanum().required(),
  lastName: joi.string().alphanum().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required().alphanum(),
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).required(),
});
const phoneSchema = joi.object({
  phoneNumber: joi.string().min(10).required(),
});
const updateSchema = joi.object({
  firstName: joi.string().alphanum().required(),
  lastName: joi.string().alphanum().required(),
  // email: joi.string().email().required(),
  // phoneNumber: joi.string().min(10).required(),
  // password: joi.string().min(6).required().alphanum(),
  // currentPassword: joi.string().alphanum().required().min(6),
});

const checkError = (value) => {
  if (value.error)
    throw new APIError(
      "validation error",
      value.error.message,
      400,
      "validateRegister"
    );
};
class validate {
  validateRegister(req, res, next) {
    try {
      const value = registerSchema.validate(req.body);
      checkError(value);
      next();
    } catch (err) {
      next(err);
    }
  }
  validateLogin(req, res, next) {
    try {
      const value = loginSchema.validate(req.body);
      checkError(value);
      next();
    } catch (err) {
      next(err);
    }
  }
  validatePhone(req, res, next) {
    try {
      const value = phoneSchema.validate(req.body);
      checkError(value);
      next();
    } catch (err) {
      next(err);
    }
  }
  validateUserUpdate(req, res, next) {
    try {
      const value = updateSchema.validate(req.body);
      checkError(value);
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new validate();
