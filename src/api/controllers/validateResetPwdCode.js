import mongoose from 'mongoose';

export default app => {
  app.get('/resetPassword', (req, res) => {
    const uid = req.query.uid;
    const resetPwdCode = req.query.resetPwdCode;
    const email = req.query.email + '.com';
    // console.log(123);
    console.log(uid + ' ' + email);
    if (!uid || !email || !resetPwdCode) {
      res.send({});
      return;
    }

    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = { email, resetPwdCode };
    const conditions = uid.length === 6 ? { tid: uid, ...condition } : { sid: uid, ...condition };

    User.findOne(conditions, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        console.log(user);
        res.send(user);
      }
    });
  });
};
