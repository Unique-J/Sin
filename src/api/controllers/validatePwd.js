import mongoose from 'mongoose';

export default app => {
  app.post('/validatePwd', (req, res) => {
    const { uid, pwd } = req.body;
    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = uid.length === 6 ? { tid: uid, pwd } : { sid: uid, pwd };
    // cconst update = { $set: { pwd }};

    User.findOne(condition, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        if (user) {
          res.send(user);
          return;
        }
        res.send({});
      }
    });
  });
};
