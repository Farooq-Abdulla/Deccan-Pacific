require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODBCONNECTION);

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  clear: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date().toLocaleString(),
  },
});

const ContactUsForm = mongoose.model("ContactUsForm", contactUsSchema);

module.exports = {
  ContactUsForm: ContactUsForm,
};
