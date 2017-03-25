import mongoose from 'mongoose';

export default app => {
  app.post('/saveComment', (req, res) => {
    const { article, content, user, comment } = req.body;
    // console.log('API');
    // console.log(comment);
    const Comment = mongoose.model('comment');
    const commentObj = {
      reviewerida: user.tid || user.sid,
      reviewernamea: user.name,
      revieweridb: (comment && comment.reviewerida) || article.authorid,
      reviewernameb: (comment && comment.reviewernamea) || article.authorName,
      content,
      time: new Date(),
      articleid: article._id
    };
    const commentInstance = new Comment(commentObj);

    if (!comment) {
      commentInstance.save(err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Save Comment Successfully.');
        }
      });
    } else {
      console.log(commentObj);
      const update = { $push: { comments: commentObj } };
      Comment.update({ _id: comment._id }, update, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Update Comment Successfully.');
        }
      });
    }
  });
};
