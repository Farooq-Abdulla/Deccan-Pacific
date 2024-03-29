require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODBCONNECTION);
const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true, // Use 12-hour clock
};

const serviceQuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  Apt: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  markAsDone: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
  queryRank: {
    type: Number,
    default: 5,
  },
});

const MarkedServiceQuerySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  Apt: {
    type: String,
  },
  email: {
    type: String,
  },
  problem: {
    type: String,
  },
  markAsDone: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

const ServiceQuery = mongoose.model("ServiceQuery", serviceQuerySchema);

const ShowAllServiceQuery = mongoose.model(
  "ShowAllServiceQuery",
  MarkedServiceQuerySchema
);

module.exports = {
  ServiceQuery: ServiceQuery,
  ShowAllServiceQuery: ShowAllServiceQuery,
};
