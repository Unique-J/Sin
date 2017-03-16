import mongoose from 'mongoose';

export default app => {
  app.post('/login', (req, res) => {
    const user = {
      userid: req.body.userid,
      pwd: req.body.pwd
    };
    // console.log(user);
    if (user.userid.length === 6) {
      const Teacher = mongoose.model('teacher');
      Teacher.findOne({ tid: user.userid, pwd: user.pwd }, (err, teacher) => {
        if (err) {
          console.error(err);
        } else {
          const session = req.session;
          session.user = teacher;
          res.send(teacher);
        }
      });
    } else if (user.userid.length === 11) {
      const Student = mongoose.model('student');
      Student.findOne({ sid: user.userid, pwd: user.pwd }, (err, student) => {
        if (err) {
          console.error(err);
        } else {
          const session = req.session;
          session.user = student;
          res.send(student);
        }
      });
    } else {
      res.send(null);
    }
    // const User = mongoose.model('user');
    // User.findUser(user, (err, users) => {
    //   console.log(users);
    //   if (users) {
    //     console.log('success');
    //     const session = req.session;
    //     session.user = user;
    //     res.json(user);
    //   } else {
    //     console.log('fail');
    //     res.json(null);
    //   }
    // });
  });
};
