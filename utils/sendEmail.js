const Mailgun = require("mailgun.js");
const FormData = require("form-data");

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async ({ to, subject, html, text }) => {
  return await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: process.env.MAILGUN_FROM,
    to,
    subject,
    html,
    text,
  });
};

module.exports = { sendEmail };