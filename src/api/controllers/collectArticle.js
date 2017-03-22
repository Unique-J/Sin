import mongoose from 'mongoose';

export default app => {
  app.post('/collectArticle', (req, res) => {
    const { id, sid } = req.body;
    const Student = mongoose.model('student');
    const update = { $push: { collections: id } };

    Student.update({ sid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        Student.findOne({ sid }, (error, student) => {
          if (err) {
            console.error(error);
          } else {
            res.send(student);
          }
        });
      }
    });
  });
};
