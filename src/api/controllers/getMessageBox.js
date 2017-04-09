import mongoose from 'mongoose';

export default app => {
  app.post('/getMessageBox', (req, res) => {
    const { uid } = req.body;
    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = uid.length === 6 ? { tid: uid } : { sid: uid };

    User.findOne(condition, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(user.messagebox.reverse());
        res.send(user.messagebox.reverse());
      }
    });
  });
};
