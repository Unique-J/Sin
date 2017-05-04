import mongoose from 'mongoose';

export default app => {
  app.post('/searchStudents', (req, res) => {
    const { condition, uid } = req.body;
    const sidCondition = { sid: { $regex: condition, $options: '$i' } };
    const nameCondition = { name: { $regex: condition, $options: '$i' } };
    const searchCondition = {
      sid: { $ne: uid },
      $or: [sidCondition, nameCondition],
    };

    const Student = mongoose.model('student');
    Student.find(searchCondition, (err, students) => {
      if (err) {
        console.error(err);
      } else {
        res.send(students);
      }
    });
  });
};
