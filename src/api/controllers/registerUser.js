import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default app => {
  app.post('/registerUser', (req, res) => {
    const user = {
      id: req.body.id,
      pwd: req.body.pwd,
      email: req.body.email,
      gender: req.body.gender
    };

    const hash = crypto.createHash('sha512');
    const sha = hash.update(user.id).digest('hex');
    console.log(sha + ' ' + sha.length);
    // if (user.id.length === 6) {

    // } else if (user.id.length === 11) {

    // } else {

    // }
    console.log(user);

    // create reusable transporter object using the default SMTP transport
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.sina.com',
  //     secureConnection: true,
  //     auth: {
  //       user: 'yangji_1005@sina.com',
  //       pass: 'yjlMY2401--'
  //     }
  //   });

  //   // setup email data with unicode symbols
  //   const mailOptions = {
  //     from: '"YangJi 👻" <yangji_1005@sina.com>', // sender address
  //     to: user.email, // list of receivers
  //     subject: 'Sin register', // Subject line
  //     text: '123456', // plain text body
  //     html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1>' // html body
  //   };

  //   // send mail with defined transport object
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log('Message %s sent: %s', info.messageId, info.response);
  //   });
  });
};
