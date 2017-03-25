import mongoose from 'mongoose';

export default app => {
  app.post('/saveComment', (req, res) => {
    const { article, content, user } = req.body;
    const Article = mongoose.model('comment');
    const articleInstance = new Article({
      reviewerida: user.tid || user.sid,
      reviewernamea: user.name,
      revieweridb: article.authorid,
      reviewernameb: article.authorName,
      content,
      time: new Date(),
      articleid: article._id
    });

    articleInstance.save(err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Save Comment Successfully.');
      }
    });
  });
};
