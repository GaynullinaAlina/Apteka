const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: "socialnaya.apteka30@mail.ru",
      pass: "dM9qeH0EBgWBEpFbVKEn",
    },
  },
  {
    from: "socialnaya.apteka30@mail.ru",
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email send: ", info);
  });
};

module.exports = mailer;
