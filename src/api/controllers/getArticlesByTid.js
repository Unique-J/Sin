import mongoose from 'mongoose';

export default app => {
  app.post('/getArticlesByTid', (req, res) => {
    const { tid } = req.body;

    const Article = mongoose.model('article');
    Article.find({ authorid: tid }, (err, articles) => {
      if (err) {
        console.error(err);
      } else {
        res.send(articles);
      }
    });
  });
};
