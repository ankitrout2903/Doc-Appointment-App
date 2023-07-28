const mongoose = require("mongoose");

const docterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    specialisation: {
      type: String,
      required: [true, "Please enter your specialisation"],
    },
    experience: {
      type: String,
      required: [true, "Please enter your experience"],
    },
    feesPerConsultation: {
      type: String,
      required: [true, "Please enter your fees per consultation"],
    },
    status: {
        type: String,
        default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Please enter your timings"],
    },
  },
  { timestamps: true }
);

const docterModel = mongoose.model("docters", docterSchema);
module.exports = docterModel;
