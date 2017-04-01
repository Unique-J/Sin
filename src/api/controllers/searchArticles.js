import mongoose from 'mongoose';

export default app => {
  app.post('/searchArticles', (req, res) => {
    const { searchCondition } = req.body;
    const Article = mongoose.model('article');

    Article.find({ title: searchCondition }, (err, articles) => {
      if (err) {
        console.error(err);
      } else {
        console.log(articles);
        res.send(articles);
      }
    });
  });
};
