import mongoose from 'mongoose';

export default app => {
  app.post('/saveChildComment', (req, res) => {
    const { content, user, childComment, commentid } = req.body;
    const Comment = mongoose.model('comment');
    const newChildComment = {
      reviewerida: user.sid || user.tid,
      reviewernamea: user.name,
      revieweridb: childComment.reviewerida,
      reviewernameb: childComment.reviewernamea,
      content,
      time: new Date(),
      articleid: childComment.articleid,
    };
    const update = { $push: { comments: newChildComment } };

    Comment.update({ _id: commentid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Save ChildComment Successfully.');
      }
    });
  });
};
