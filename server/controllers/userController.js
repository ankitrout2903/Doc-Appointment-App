const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = await userModel.create(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .status(200)
      .send({ message: "User created successfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid password", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "login Error" });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        message: "User found",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "auth Error", success: false, error });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findOneAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "applied for doctor successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while applying for doctor",
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try{
    const user = await userModel.findOne({ _id: req.user.id });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "notifications fetched successfully",
      data: updatedUser,
    });

  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting notifications",
    });
};
};


module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController
};
