import mongoose from 'mongoose';

const getUpdate = (title, content) => {
  switch (title) {
    case '描述': return { $set: { description: content } };
    default: return {};
  }
};

export default app => {
  app.post('/updateInfo', (req, res) => {
    const { uid, title, content } = req.body;
    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');

    const condition = uid.length === 6 ? { tid: uid } : { sid: uid };
    const update = getUpdate(title, content);

    User.update(condition, update, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result.n === 0) {
          res.send({ success: false });
          console.info('Update Infomation Failed.');
          return;
        }
        console.log(result);
        res.send({ success: true });
        console.info('Update Infomation Successfully.');
      }
    });
  });
};
