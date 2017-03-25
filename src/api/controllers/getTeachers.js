import mongoose from 'mongoose';

export default app => {
  app.get('/getTeachers', (req, res) => {
    const Teacher = mongoose.model('teacher');

    Teacher.find({}, (err, teachers) => {
      if (err) console.error(err);
      // console.log(teachers);
      res.send(teachers);
    }).limit(5);
  });
};
