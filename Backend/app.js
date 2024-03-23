require("dotenv").config();
const {
  sendFirstEmail,
  sendSecondEmail,
  sendFirstEmailServices,
  sendSecondEmailServices,
} = require("./emailFunctions");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
    res.send("Emails sent successfully");
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
    res.send("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
