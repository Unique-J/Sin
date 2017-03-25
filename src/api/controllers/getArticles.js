import mongoose from 'mongoose';

export default app => {
  app.get('/getArticles', (req, res) => {
    const Article = mongoose.model('article');

    Article.find({}, (err, articles) => {
      if (err) {
        console.error(err);
      } else {
        res.send(articles);
      }
    });
  });
};
