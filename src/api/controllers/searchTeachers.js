import mongoose from 'mongoose';

export default app => {
  app.post('/searchTeachers', (req, res) => {
    const { condition, uid } = req.body;
    const sidCondition = { tid: { $regex: condition, $options: '$i' } };
    const nameCondition = { name: { $regex: condition, $options: '$i' } };
    const searchCondition = {
      tid: { $ne: uid },
      $or: [sidCondition, nameCondition],
    };

    const Teacher = mongoose.model('teacher');
    Teacher.find(searchCondition, (err, teachers) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(teachers);
        res.send(teachers);
      }
    });
  });
};
