import mongoose from 'mongoose';

export default app => {
  app.post('/getCollections', (req, res) => {
    const { sid } = req.body;
    const Student = mongoose.model('student');
    const Article = mongoose.model('article');
    // const condition = {};

    Student.findOne({ sid }, (error, student) => {
      if (error) {
        console.error(error);
      } else {
        Article.find({ _id: { $in: student.collections } }, (err, articles) => {
          if (err) {
            console.error(err);
          } else {
            // console.log(articles);
            res.send(articles);
          }
        });
      }
    });
  });
};
