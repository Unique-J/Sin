import mongoose from 'mongoose';

export default app => {
  app.post('/updatePassword', (req, res) => {
    const { uid, pwd } = req.body;
    console.log(uid + ' ' + pwd);
    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = uid.length === 6 ? { tid: uid } : { sid: uid };
    const update = { $set: { pwd } };

    User.update(condition, update, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result.n === 0) {
          console.log('修改密码失败');
          res.send({ success: false });
        } else {
          console.log('修改密码成功');
          res.send({ success: true });
        }
      }
    });
  });
};
