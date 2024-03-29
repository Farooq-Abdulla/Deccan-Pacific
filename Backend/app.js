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
  const { email, password } = req.body;
  const token = jwt.sign({ email: email }, AccessTokenSecret);
  res.setHeader("Authorization", "Bearer " + token);

  res.status(200).json({ msg: "Success", token: token });
});

app.get("/admin/info", async function (req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is Null" });
  }
  try {
    const decoded = jwt.verify(token, AccessTokenSecret);
    const { email } = decoded;
    // console.log(email);
    const validUser = await Login.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const info = await ServiceQuery.find();
    res.status(200).json(info);
  } catch (error) {
    console.log("JWT verification error:", error);
    res.status(401).json({ msg: "Unauthorized" });
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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is Null" });
  }
  try {
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
    console.log("JWT verification error:", error);
    res.status(401).json({ msg: "Unauthorized" });
  }
});

// const { Configuration, OpenAIApi } = require("openai");

// const API_Key = process.env.OPENAI_API_KEY;

// const config = new Configuration({
//   apiKey: API_Key,
// });

// const openai = new OpenAIApi(config);

// async function generateChatCompletion() {
//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       prompt: "Hi, how are you today?",
//       temperature: 1,
//       max_tokens: 256,
//       top_p: 1,
//       frequency_penalty: 0,
//     });

//     console.log(response.data.choices[0].text);
//   } catch (error) {
//     console.error("Error generating chat completion:", error);
//   }
// }

// generateChatCompletion();
const { OpenAI } = require("openai");

const openaiClient = new OpenAI(process.env.OPENAI_API_KEY);

async function rateQuery(query) {
  try {
    // Call the correct method for creating chat completions
    const response = await openaiClient.someMethodForChatCompletion({
      model: "gpt-3.5-turbo",
      prompt: query,
      max_tokens: 1,
    });

    // Extract rating from the OpenAI response and return it
    // You may need to customize this based on the response format
    const rating = parseFloat(response.data.choices[0].text);
    return rating;
  } catch (error) {
    console.error("Error rating query:", error);
    return null;
  }
}

// Usage example
rateQuery("AC isn't working properly")
  .then((rating) => {
    console.log("Rating:", rating);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
