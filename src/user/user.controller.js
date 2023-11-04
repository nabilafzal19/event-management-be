const {
  fetchAllUsers,
  createOneUser,
  generateAuthToken,
  authenticateUser,
  phoneAuth,
  verifyOTP,
  updateUser,
  getProfile,
  saveProfileImage,
} = require("./user.service");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await fetchAllUsers();
      res.json({ success: true, data: users });
    } catch (e) {
      next(e);
    }
  }

  async registerUser(req, res, next) {
    try {
      const { email, phoneNumber, firstName, lastName, password } = req.body;
      const user = await createOneUser({
        email,
        phoneNumber,
        firstName,
        lastName,
        password,
      });
      const token = await generateAuthToken(user);
      const payload = {
        email: user.email ? user.email : "",
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        id: user.id,
      };
      res.send({ success: true, data: { user: payload, token: token } });
    } catch (e) {
      next(e);
    }
  }

  async signInUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authenticateUser(email, password);
      const token = await generateAuthToken(user);
      const payload = {
        email: user.email ? user.email : "",
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        id: user.id,
      };
      res.json({ success: true, data: { token, user: payload } });
    } catch (err) {
      next(err);
    }
  }

  async signInWithPhone(req, res, next) {
    try {
      const { phoneNumber } = req.body;
      await phoneAuth(phoneNumber);
      res.json({ success: true, data: { message: "OTP Generated" } });
    } catch (err) {
      next(err);
    }
  }

  async verifyOTPCode(req, res, next) {
    try {
      const { phoneNumber, otp } = req.body;
      const user = await verifyOTP(phoneNumber, otp);
      const token = await generateAuthToken(user);
      res.json({ success: true, data: { user, token } });
    } catch (err) {
      next(err);
    }
  }

  async patchUser(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        role,
        password,
        currentPassword,
        phoneNumber,
        email,
      } = req.body;
      const id = req.user.id;
      const user = await updateUser({
        id,
        firstName,
        lastName,
        role,
        password,
        currentPassword,
        phoneNumber,
        email,
      });
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }

  async getUserProfile(req, res, next) {
    try {
      console.log;
      const data = await getProfile(req.user.id);
      res.json({ success: true, data: data });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await updateUser({
        id: req.user.id,
        currentPassword,
        password: newPassword,
      });
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const { file, user } = req;
      const saved = await saveProfileImage(file, user);
      res.json({ success: true, data: "OK" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
