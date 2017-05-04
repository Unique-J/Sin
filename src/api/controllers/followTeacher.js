import mongoose from 'mongoose';

export default app => {
  app.post('/followTeacher', (req, res) => {
    const { sid, tid } = req.body;
    const Student = mongoose.model('student');
    const update = { $push: { followers: tid } };
    // console.log(sid + ' ' + tid);

    const Teacher = mongoose.model('teacher');

    Student.update({ sid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        Student.findOne({ sid }, (error, student) => {
          if (error) {
            console.error(error);
          } else {
            Teacher.update({ tid }, { $inc: { fansNum: 1 } }, (error1, result) => {
              // console.log(result);
              if (result.n === 0) {
                console.log(error1);
              } else {
                res.send(student);
              }
            });
          }
        });
      }
    });
  });
};
