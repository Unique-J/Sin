import mongoose from 'mongoose';

export default app => {
  app.post('/getUserFollowers', (req, res) => {
    const { sid, type } = req.body;
    const Student = mongoose.model('student');
    const User = type === 0 ? mongoose.model('teacher') : Student;

    Student.findOne({ sid }, (error, student) => {
      if (error) {
        console.error(error);
      } else {
        const condition = type === 0 ? { tid: { $in: student.followers } } :
          { sid: { $in: student.followers } };
        User.find(condition, (err, users) => {
          if (err) {
            console.error(err);
          } else {
            res.send(users);
          }
        });
      }
    });
  });
};
