import mongoose from 'mongoose';

export default app => {
  app.post('/getCommentbox', (req, res) => {
    const { userid } = req.body;
    const User = userid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = userid.length === 6 ? { tid: userid } : { sid: userid };

    User.findOne(condition, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(user);
        // console.log(user.commentbox);
        user.commentbox.sort((comment1, comment2) => comment2.time - comment1.time);
        res.send(user.commentbox);
      }
    });
  });
};
