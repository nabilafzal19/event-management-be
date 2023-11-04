const userModel = require("./user.model");
const jwt = require("jsonwebtoken");
const APIError = require("../utils/error.class");
const bcrypt = require("bcrypt");

const fetchAllUsers = async () => {
  return await userModel
    .find()
    .select("email")
    .select("role")
    .select("phoneNumber")
    .select("firstName")
    .select("lastName");
};

const checkIfUserExists = async (email, phoneNumber) => {
  const emailId = await userModel.findOne({ email });
  let phone = null;
  if (phoneNumber) {
    phone = await userModel.findOne({ phoneNumber });
  }

  if (emailId || phone) {
    return true;
  }

  return false;
};

const createOneUser = async ({
  email,
  phoneNumber,
  firstName,
  lastName,
  password,
}) => {
  let emailId = null;
  let phone = null;

  if (email) {
    emailId = await userModel.findOne({ email: email });
  }

  if (phoneNumber) {
    phone = await userModel.findOne({ phoneNumber });
  }

  if (emailId || phone) {
    console.log(emailId);
    throw new APIError(
      "account exists",
      "An account with this email or phonenumber already exists",
      400,
      "createOneUser"
    );
  }
  if (password) var hashPass = await bcrypt.hash(password, 10);

  const newUser = await new userModel({
    email,
    phoneNumber,
    firstName,
    lastName,
    password: hashPass,
  }).save();
  newUser.password = undefined;
  console.log(newUser);
  return newUser;
};

const updateUser = async ({
  id,
  email,
  password,
  currentPassword,
  role,
  phoneNumber,
  firstName,
  lastName,
}) => {
  let user = await userModel.findById(id);

  const verifyEmail = email ? await userModel.findOne({ email }) : null;
  const verifyPhone = phoneNumber
    ? await userModel.findOne({ phoneNumber })
    : null;

  if (verifyEmail && verifyEmail.id !== id) {
    throw new APIError("duplicate email", "Invalid Email", 400, "updateUser");
  }
  if (verifyPhone && verifyPhone.id !== id) {
    throw new APIError(
      "duplicate phone",
      "Invalid Phone Number",
      400,
      "updateUser"
    );
  }

  if (!user)
    throw new APIError(
      "user does not exist",
      "User not found",
      400,
      "updateUser"
    );

  user.firstName = firstName ? firstName : user.firstName;
  user.lastName = lastName ? lastName : user.lastName;
  user.email = email ? email : user.email;
  user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;

  if (password && currentPassword) {
    let verifyPass = await bcrypt.compare(currentPassword, user.password);
    // console.log(verifyPass);
    if (!verifyPass)
      throw new APIError("wrong password", "Wrong password", 403, "updateUser");

    user.password = await bcrypt.hash(password, 10);
  }

  let saved = await user.save();
  saved.password = undefined;
  return saved;
};

const generateAuthToken = async (user) => {
  const data = { id: user._id, role: user.role };
  const token = jwt.sign(data, process.env.SECRET_KEY);
  return token;
};

const authenticateUser = async (email, password) => {
  let user = await userModel.findOne({ email });
  if (!user)
    throw new APIError(
      "user not found",
      "Invalid Credential",
      400,
      "authenticateUser"
    );

  const verified = await bcrypt.compare(password, user.password);
  if (!verified)
    throw new APIError(
      "password invalid",
      "Invalid Credentails",
      400,
      "authenticateUser"
    );

  user.password = undefined;
  return user;
};

const phoneAuth = async (phoneNumber) => {
  let user = await userModel.findOne({ phoneNumber });
  if (user) {
    user.otp = 1234;
    await user.save();
    return user;
  } else {
    let user = await createOneUser({ phoneNumber: phoneNumber });
    user.otp = 1234;
    await user.save();
    return user;
  }
};

const verifyOTP = async (phoneNumber, otp) => {
  let user = await userModel.findOne({ phoneNumber });
  if (user.otp === otp) {
    user.otp = undefined;
    await user.save();
    user.password = undefined;
    return user;
  }
  throw new APIError("invalid OTP", "Invalid OTP", 400, "verifyOTP");
};

const getProfile = async (id) => {
  let data = await userModel.findById(id);
  if (!data)
    throw new APIError("invalid id", "Please Authenticate", 403, "getProfile");
  data.password = undefined;
  return data;
};

const saveProfileImage = async (file, user) => {
  const data = await userModel.findById(user);

  console.log(file);
};

module.exports = {
  fetchAllUsers,
  createOneUser,
  generateAuthToken,
  authenticateUser,
  phoneAuth,
  verifyOTP,
  getProfile,
  updateUser,
  saveProfileImage,
};
