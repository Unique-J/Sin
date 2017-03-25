import mongoose from 'mongoose';

export default app => {
  app.post('/cancelFollowTeacher', (req, res) => {
    const { sid, tid } = req.body;
    const Student = mongoose.model('student');
    const update = { $pull: { followers: tid } };
    // console.log(sid + ' ' + tid);

    Student.update({ sid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        Student.findOne({ sid }, (error, student) => {
          if (error) {
            console.error(error);
          } else {
            res.send(student);
          }
        });
      }
    });
  });
};
