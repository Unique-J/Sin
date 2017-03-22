import mongoose from 'mongoose';

export default app => {
  app.post('/getStudent', (req, res) => {
    const { sid } = req.body;
    const Student = mongoose.model('student');

    Student.findOne({ sid }, (err, student) => {
      if (err) {
        console.error(err);
      } else {
        res.send(student);
        console.log(student);
      }
    });
  });
};
