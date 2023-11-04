const router = require("express").Router();
const ROLE_ENUM = require("../utils/constants");
const authHandler = require("../utils/middleware/auth.middleware");
const upload = require("../utils/multer.config");
const userController = require("./user.controller");
const userValidation = require("./user.validation");

router.get("/", authHandler([ROLE_ENUM.ADMIN]), userController.getAllUsers);
router.get("/profile", authHandler(), userController.getUserProfile);
router.patch(
  "/",
  authHandler(),
  userValidation.validateUserUpdate,
  userController.patchUser
);
router.post(
  "/register",
  userValidation.validateRegister,
  userController.registerUser
);
router.post("/login", userValidation.validateLogin, userController.signInUser);
router.post(
  "/login/phone",
  userValidation.validatePhone,
  userController.signInWithPhone
);
router.post("/login/verifyOTP", userController.verifyOTPCode);
router.post("/changePassword", authHandler(), userController.changePassword);

router.post(
  "/upload",
  authHandler(),
  upload.single("image"),
  userController.uploadProfileImage
);
module.exports = router;
