import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const sendEmail = (userid, email, shaid) => {
  const urlEmail = email.substring(0, email.length - 4);
  const url = `http://localhost:3030/validateemail?userid=${userid}&email=${urlEmail}&validateCode=${shaid}`;
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
    subject: 'Sin register', // Subject line
    text: '123456', // plain text body
    html: `<a href=${url}>请点击链接以完成邮箱验证</a>` // html body
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
  app.post('/registerUser', (req, res) => {
    const user = {
      id: req.body.id,
      pwd: req.body.pwd,
      email: req.body.email,
      gender: req.body.gender
    };

    const hash = crypto.createHash('sha512');
    const shaid = hash.update(user.id).digest('hex');
    // console.log(shaid + ' ' + shaid.length);

    const update = {
      $set: {
        validateCode: shaid,
        createTime: new Date().getTime(),
        pwd: user.pwd,
        gender: user.gender
      }
    };

    if (user.id.length === 6) {
      const Teacher = mongoose.model('teacher');
      Teacher.update({ tid: user.id }, update,
        err => {
          if (err) {
            console.error(err);
          } else {
            sendEmail(user.id, user.email, shaid);
            console.info('update succeed');
          }
        }
      );
    }
    if (user.id.length === 11) {
      const Student = mongoose.model('student');
      Student.update({ sid: user.id }, update,
        err => {
          if (err) {
            console.error(err);
          } else {
            sendEmail(user.id, user.email, shaid);
            console.info('update succeed');
          }
        }
      );
    }
    // console.log(user);
  });
};
