import mongoose from 'mongoose';

export default app => {
  app.get('/getArticlesByHeat', (req, res) => {
    const Article = mongoose.model('article');

    Article.find({}, (err, articles) => {
      if (err) {
        console.error(err);
      } else {
        res.send(articles);
      }
    }).sort({ collectNum: -1 });
  });
};
