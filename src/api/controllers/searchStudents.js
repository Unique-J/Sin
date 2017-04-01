import mongoose from 'mongoose';

export default app => {
  app.post('/searchStudents', (req, res) => {
    const { sid } = req.body;

    const Student = mongoose.model('student');
    Student.find({ sid }, (err, students) => {
      if (err) {
        console.error(err);
      } else {
        res.send(students);
      }
    });
  });
};
