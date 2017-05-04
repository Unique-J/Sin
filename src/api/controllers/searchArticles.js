import mongoose from 'mongoose';

export default app => {
  app.post('/searchArticles', (req, res) => {
    const { searchCondition } = req.body;
    const Article = mongoose.model('article');
    const titleCondition = { title: { $regex: searchCondition, $options: '$i' } };
    const descriptionCondition = { description: { $regex: searchCondition, $options: '$i' } };
    const regex = new RegExp(`<[^>]+>.*${searchCondition}.*<\/[^>]+>`);
    console.log(regex);
    const contentCondition = { content: { $regex: regex, $options: '$i' } };
    const condition = { $or: [titleCondition, descriptionCondition, contentCondition] };

    Article.find(condition, (err, articles) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(articles);
        res.send(articles);
      }
    });
  });
};
