import mongoose from 'mongoose';

export default app => {
  app.post('/getArticle', (req, res) => {
    const Article = mongoose.model('article');
    const { id } = req.body;

    Article.findOne({ _id: id }, (err, article) => {
      if (err) {
        console.error(err);
      } else {
        res.send(article);
      }
    });
  });
};
