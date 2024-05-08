/* eslint-disable no-undef */
require("dotenv").config();
const {
  sendFirstEmail,
  sendSecondEmail,
  sendFirstEmailServices,
  sendSecondEmailServices,
} = require("./emailFunctions");
const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const { zodLogin } = require("./Db/schemaValidations");
const { Login } = require("./Db/AdminloginSchemaInit");
const { adminLoginMiddleware } = require("./Middlewares/adminLoginMiddleware");
const {
  ServiceQuery,
  ShowAllServiceQuery,
} = require("./Db/ServiceQuerySchemaInit");
const { ContactUsForm } = require("./Db/ContactUsSchemaInit");
const QueryRanker = require("./QueryRank");

app.use(cors());
app.use(express.json());
const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const port = process.env.PORT;

app.get("/contactUs", (req, res) => {
  res.send("Hello World!");
});

app.post("/contactUs", async (req, res) => {
  const emailData = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    description: req.body.description,
  };

  try {
    await sendFirstEmail(emailData);
    await sendSecondEmail(emailData);
    await ContactUsForm.create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      description: req.body.description,
    });
    res.status(201).json({
      msg1: "Emails sent Successfully",
      msg2: " ContactUs Form Created",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
});

app.post("/services", async (req, res) => {
  const emailData = {
    name: req.body.name,
    address: req.body.address,
    contactNumber: req.body.contactNumber,
    Apt: req.body.Apt,
    email: req.body.email,
    problem: req.body.problem,
  };
  let rank = await QueryRanker(req.body.problem);

  try {
    await sendFirstEmailServices(emailData);
    await sendSecondEmailServices(emailData);
    await ServiceQuery.create({
      name: req.body.name,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      Apt: req.body.Apt,
      email: req.body.email,
      problem: req.body.problem,
      queryRank: rank,
    });

    res.status(201).json({
      msg1: "Emails sent successfully",
      msg2: "Service Query Created",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
});

app.post("/admin", adminLoginMiddleware, function (req, res) {
  const { email } = req.body;
  const token = jwt.sign({ email: email }, AccessTokenSecret, {expiresIn: 3600*2});

  res.status(200).json({ msg: "Success", token: token });
});

app.get("/admin/info", async function (req, res) {
  
  try {
    const authHeader = req.headers.authorization;
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (token == null) {
    console.log("In checking token is null if loop");
    return res.status(500).json({ msg: "Token is Null" });
  }
    // console.log("After If loop :",token);
    const decoded = jwt.verify(token, AccessTokenSecret);
    // console.log(decoded);
    const { email } = decoded;
    // console.log(email);
    const validUser = await Login.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const info = await ServiceQuery.find();
    res.status(200).json({ info: info, user: validUser });
  } catch (error) {
    // console.log("JWT verification error:", error);
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

app.post("/admin/info/erase", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is Null" });
  }
  try {
    const decoded = jwt.verify(token, AccessTokenSecret);
    const { email } = decoded;
    const validUser = await Login.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    // Check if req.body.checkedItems is an array
    if (!Array.isArray(req.body.checkedItems)) {
      return res.status(400).json({ msg: "Invalid checkedItems format" });
    }

    // Save checked items to ShowAllServiceQuery
    const savedItems = await ShowAllServiceQuery.create(req.body.checkedItems);

    // Delete checkedItems from ServiceQuery
    const deletedItems = await ServiceQuery.deleteMany({
      _id: { $in: savedItems.map((item) => item._id) },
    });

    res.status(200).json({ message: { savedItems, deletedItems } });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/admin/markedInfo", async (req, res) => {
  
  try {
    const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is Null" });
  }
    const decoded = jwt.verify(token, AccessTokenSecret);
    const { email } = decoded;
    // console.log(email);
    const validUser = await Login.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const info = await ShowAllServiceQuery.find();
    res.status(200).json(info);
  } catch (error) {
    // console.log("JWT verification error:", error);
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

app.get("/admin/getMarkedInfo", async (req, res) => {

  try {
    const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is Null" });
  }
    const decoded = jwt.verify(token, AccessTokenSecret);
    const { email } = decoded;
    const validUser = await Login.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }
    const filter = req.query.filter || "";
  const regexFilter = new RegExp(filter, "i"); // "i" flag for case-insensitive matching
  const filteredQuery = await ShowAllServiceQuery.find({
    $or: [
      { name: { $regex: regexFilter } },
      { email: { $regex: regexFilter } },
      { contactNumber: { $regex: regexFilter } },
      { problem: { $regex: regexFilter } },
      { date: { $regex: regexFilter } },
      { address: { $regex: regexFilter } },
      { Apt: { $regex: regexFilter } },
    ],
  });
  
  res.json({
    queries: filteredQuery.map((query) => ({
      name: query.name,
      email: query.email,
      contactNumber: query.contactNumber,
      problem: query.problem,
      _id: query._id.toString(),
      address: query.address,
      Apt: query.Apt,
      date: query.date,
      markAsDone: query.markAsDone
    })),
  });

    // const info = await ShowAllServiceQuery.find();
    // res.status(200).json(info);
  } catch (error) {
    // console.log("JWT verification error:", error);
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

app.get("/admin/getInfo",async(req,res)=>{
  try {
    const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is Null" });
  }
    const decoded = jwt.verify(token, AccessTokenSecret);
    const { email } = decoded;
    const validUser = await Login.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }
    const filter = req.query.filter || "";
  const regexFilter = new RegExp(filter, "i"); // "i" flag for case-insensitive matching
  const filteredQuery = await ServiceQuery.find({
    $or: [
      { name: { $regex: regexFilter } },
      { email: { $regex: regexFilter } },
      { contactNumber: { $regex: regexFilter } },
      { problem: { $regex: regexFilter } },
      { date: { $regex: regexFilter } },
      { address: { $regex: regexFilter } },
      { Apt: { $regex: regexFilter } },
    ],
  });
  
  res.json({
    queries: filteredQuery.map((query) => ({
      name: query.name,
      email: query.email,
      contactNumber: query.contactNumber,
      problem: query.problem,
      _id: query._id.toString(),
      address: query.address,
      Apt: query.Apt,
      date: query.date,
      queryRank: query.queryRank,
      markAsDone: query.markAsDone
    })),
  });

    // const info = await ShowAllServiceQuery.find();
    // res.status(200).json(info);
  } catch (error) {
    // console.log("JWT verification error:", error);
    return res.status(401).json({ msg: "Unauthorized" });
}
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
