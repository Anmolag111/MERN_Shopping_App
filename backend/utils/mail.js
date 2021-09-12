const nodeMailer = require("nodemailer");
const logger = require("./logger");
const template = require("./template");
require("dotenv").config();

const sendMail = async (email, type, host, data) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID, // sender mail
      pass: process.env.EMAIL_PASS, // sender pass
    },
  });

  // configure mailOptions
  let message = prepareTemplate(type, host, data);
  message = { ...message, to: email, from: "MERN Store" };

  try {
    await transporter.sendMail(message);
    logger.debug("Mail sent successfully!!");
  } catch (err) {
    logger.debug(`Error sending mail check log for more info `, err);
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case "reset":
      message = template.resetEmail(host, data);
      break;

    case "reset-confirmation":
      message = template.confirmResetPasswordEmail();
      break;

    case "signup":
      message = template.signupEmail(data);
      break;

    case "order-confirmation":
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = "";
  }

  return message;
};

module.exports = sendMail;
