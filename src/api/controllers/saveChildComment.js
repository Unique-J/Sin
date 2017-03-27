import mongoose from 'mongoose';

function updateCommentbox(comment) {
  const uid = comment.revieweridb;
  const update = { $push: { commentbox: comment } };

  if (uid.length === 6) {
    const Teacher = mongoose.model('teacher');

    Teacher.update({ tid: uid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Save Teacher\'s Commentbox Successfully.');
      }
    });
  }
  if (uid.length === 11) {
    const Student = mongoose.model('student');

    Student.update({ sid: uid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Save Student\'s Commentbox Successfully.');
      }
    });
  }
}

export default app => {
  app.post('/saveChildComment', (req, res) => {
    const { content, user, childComment, commentid } = req.body;
    const Comment = mongoose.model('comment');
    // console.log(childComment);
    const newChildComment = {
      // _id: mongoose.Types.ObjectId(), // eslint-disable-line
      reviewerida: user.sid || user.tid,
      reviewernamea: user.name,
      revieweridb: childComment.reviewerida,
      reviewernameb: childComment.reviewernamea,
      content,
      replyContent: childComment.content,
      time: new Date(),
      articleid: childComment.articleid,
      commentid
    };
    const update = { $push: { comments: newChildComment } };
    // console.log(123);
    // console.log(newChildComment);
    console.log(commentid);

    Comment.update({ _id: commentid }, update, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Save ChildComment Successfully.');
        updateCommentbox(newChildComment);
      }
    });
  });
};
