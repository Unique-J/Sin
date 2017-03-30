import mongoose from 'mongoose';

export default app => {
  app.post('/saveArticle', (req, res) => {
    // console.log(111);
    const { title, description, content, tags, date, tid, authorName } = req.body;
    // res.send(200);
    // console.log(title + ' ' + description + ' ' + content + ' ' + tags + ' ' + date);
    const Article = mongoose.model('article');
    const article = new Article({
      title,
      description,
      content,
      tags,
      date,
      authorid: tid,
      authorName
    });

    article.save(err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Save Article Successfully.');
        res.send(200);
      }
    });
  });
};
