// const express = require("express");
// const app = express();
// const nodemailer = require("nodemailer");
// const port = 8000;
// app.use(express.json());

// app.post("/contactUs", (req, res) => {
//   //   console.log(req.body);
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "farooqabdulla279@gmail.com",
//       pass: "hxnw xplq iwhh cnlw",
//     },
//   });
//   const mailOptions = {
//     from: "farooqabdulla279@gmail.com",
//     to: req.body.email,
//     subject: req.body.subject,
//     text: req.body.description,
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Error sending email");
//     } else {
//       console.log("Email sent: " + info.response);
//       res.send("Email sent successfully");
//     }
//   });
// });

// app.listen(port, () => console.log(`App listening on port ${port}!`));
