import mongoose from 'mongoose';

export default app => {
  app.post('/searchTeachers', (req, res) => {
    const { tid } = req.body;

    const Teacher = mongoose.model('teacher');
    Teacher.find({ tid }, (err, teachers) => {
      if (err) {
        console.error(err);
      } else {
        console.log(teachers);
        res.send(teachers);
      }
    });
  });
};
