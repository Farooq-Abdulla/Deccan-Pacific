const nodemailer = require("nodemailer");
const sendFirstEmail = (emailData, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS,
    },
  });
  //   console.log(process.env.USER);
  //   console.log(process.env.PASS);
  // console.log(process.env);

  const mailOptions = {
    from: process.env.USERNAME,
    to: emailData.email,
    replyTo: process.env.USERNAME,
    subject: emailData.subject,
    html: `<h1> Hello ${emailData.name},</h1> <br />  <p> Thank you for contacting Deccan Pacific, we are here to help! We will provide a response within 24-48 hours (M-F 9am-5pm CST).</p> <br/> <p>If you have any additional info to add that you think will help us to assist you, please reply to this email. </p> <br/> <p> Thank you for contacting Deccan Pacific</p>  <br/> <p> Sincerely, </p>  <p> Deccan Pacific Team</p> <br/>   <br/> <p>Description:</p> <p> Subject : ${emailData.subject}</p> <p>${emailData.description}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("First Email sent: " + info.response);
    }
  });
};

// Function to send the second email
const sendSecondEmail = (emailData, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS,
    },
  });

  const mail2Options = {
    from: process.env.USERNAME,
    to: process.env.USERNAME,
    subject: emailData.subject,
    text: emailData.description,
    cc: process.env.CC,
    priority: "high",
  };

  transporter.sendMail(mail2Options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Second Email sent: " + info.response);
    }
  });
};

const sendFirstEmailServices = (emailData, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS,
    },
  });
  //   console.log(process.env.USER);
  //   console.log(process.env.PASS);
  // console.log(process.env);

  const mailOptions = {
    from: process.env.USERNAME,
    to: emailData.email,
    replyTo: process.env.USERNAME,
    subject: `Query Request from ${emailData.address} Apt: ${emailData.Apt}`,
    html: `<h1> Hello ${emailData.name},</h1> <br />  <p> Thank you for contacting Deccan Pacific, we are here to help! We will provide a response within 24-48 hours (M-F 9am-5pm CST).</p> <br/> <p>If you have any additional info to add that you think will help us to assist you, please reply to this email. </p> <br/> <p> Thank you for contacting Deccan Pacific</p>  <br/> <p> Sincerely, </p>  <p> Deccan Pacific Team</p> <br/>   <br/> <p>Description:</p> <p> Subject : ${emailData.subject}</p><p> Address : ${emailData.address}</p><p> Apt : ${emailData.Apt}</p> <p> Contact : ${emailData.contactNumber}</p> <p>${emailData.problem}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("First Email sent: " + info.response);
    }
  });
};

const sendSecondEmailServices = (emailData, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS,
    },
  });

  const mail2Options = {
    from: process.env.USERNAME,
    to: process.env.USERNAME,
    subject: `Query Request from ${emailData.address} Apt: ${emailData.Apt}`,
    text: emailData.problem,
    cc: process.env.CC,
    priority: "high",
  };

  transporter.sendMail(mail2Options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Second Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendFirstEmail,
  sendSecondEmail,
  sendFirstEmailServices,
  sendSecondEmailServices,
};
