import mongoose from 'mongoose';

export default app => {
  app.post('/getPerson', (req, res) => {
    const { uid } = req.body;
    const Person = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
    const condition = uid.length === 6 ? { tid: uid } : { sid: uid };

    Person.findOne(condition, (err, person) => {
      if (err) {
        console.error(err);
      } else {
        res.send(person);
      }
    });
  });
};
