import mongoose from 'mongoose';

export default app => {
  app.post('/cancelCollectArticle', (req, res) => {
    const { id, sid } = req.body;
    const Student = mongoose.model('student');
    const update = { $pull: { collections: id } };

    const Article = mongoose.model('article');

    Student.update({ sid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        Student.findOne({ sid }, (error, student) => {
          if (err) {
            console.error(error);
          } else {
            Article.update({ _id: id }, { $inc: { collectNum: -1 } }, (error1, result) => {
              // console.log(result);
              if (result.n === 0) {
                console.log(error1);
              } else {
                res.send(student);
              }
            });
          }
        });
      }
    });
  });
};
