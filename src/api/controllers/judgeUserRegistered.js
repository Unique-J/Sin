import mongoose from 'mongoose';

export default app => {
  app.post('/judgeUserRegistered', (req, res) => {
    const id = req.body.id;
    const idLength = id.length;

    if (idLength === 6) {
      const Teacher = mongoose.model('teacher');
      Teacher.findOne({ tid: id }, (err, teacher) => {
        if (err) {
          console.error(err);
        } else {
          res.json(teacher);
        }
      });
    } else if (idLength === 11) {
      const Student = mongoose.model('student');
      Student.findOne({ sid: id }, (err, student) => {
        if (err) {
          console.error(err);
        } else {
          res.json(student);
        }
      });
    } else {
      res.json(null);
    }
  });
};
