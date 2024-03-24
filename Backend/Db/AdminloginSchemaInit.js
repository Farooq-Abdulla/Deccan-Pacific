require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODBCONNECTION);
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Login = mongoose.model("Login", loginSchema);

// Login.create({
//   email: "itachi09uchiha03@gmail.com",
//   password: "1234567890",
// });

module.exports = {
  Login: Login,
};
