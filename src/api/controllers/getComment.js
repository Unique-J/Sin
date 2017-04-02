import mongoose from 'mongoose';

export default app => {
  app.post('/getComment', (req, res) => {
    const { commentid } = req.body;
    const Comment = mongoose.model('comment');
    const comments = [];

    Comment.findOne({ _id: commentid }, (err, comment) => {
      if (err) {
        console.error(err);
      } else {
        const firstComment = {
          reviewerida: comment.reviewerida,
          reviewernamea: comment.reviewernamea,
          revieweridb: comment.revieweridb,
          reviewernameb: comment.reviewernameb,
          content: comment.content,
          time: comment.time
        };

        comments.push(firstComment);

        if (comment.comments) {
          comment.comments.map(cmt => {
            const childComment = {
              reviewerida: cmt.reviewerida,
              reviewernamea: cmt.reviewernamea,
              revieweridb: cmt.revieweridb,
              reviewernameb: cmt.reviewernameb,
              content: cmt.content,
              time: cmt.time
            };
            return comments.push(childComment);
          });
        }

        // console.log('comments:');
        // console.log(comments);
        res.send(comments);
      }
    });
  });
};
