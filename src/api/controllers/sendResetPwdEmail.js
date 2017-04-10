import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const sendEmail = (uid, email, shaid) => {
  const urlEmail = email.substring(0, email.length - 4);
  const url = `http://localhost:3000/resetpassword?uid=${uid}&email=${urlEmail}&resetPwdCode=${shaid}`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.sina.com',
    secureConnection: true,
    auth: {
      user: 'yangji_1005@sina.com',
      pass: ''
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"YangJi 👻" <yangji_1005@sina.com>', // sender address
    to: email, // list of receivers
    subject: 'Sin reset password.', // Subject line
    text: '123456', // plain text body
    html: `<a href=${url}>重置密码</a>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

export default app => {
  app.post('/sendResetPwdEmail', (req, res) => {
    const { uid, email } = req.body;

    if (uid.length !== 6 && uid.length !== 11) {
      res.send({});
      return;
    }

    const hash = crypto.createHash('sha512');
    const shaid = hash.update(uid).digest('hex');
    // console.log(shaid + ' ' + shaid.length);

    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = uid.length === 6 ? { tid: uid } : { sid: uid };

    const update = {
      $set: {
        resetPwdCode: shaid,
        resetPwdTime: new Date().getTime(),
      }
    };

    User.update(condition, update,
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          if (result.n === 0) {
            res.send({});
            console.info('Update failed.');
            return;
          }
          sendEmail(uid, email, shaid);
          res.send({ success: true });
          console.info('update succeed');
          return;
        }
      }
    );
    // console.log(user);
  });
};
