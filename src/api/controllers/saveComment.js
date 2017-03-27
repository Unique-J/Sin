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
  app.post('/saveComment', (req, res) => {
    const { article, content, user, comment } = req.body;
    console.log('API');
    console.log(comment);
    const Comment = mongoose.model('comment');
    const commentObj = {
      _id: mongoose.Types.ObjectId(), // eslint-disable-line
      reviewerida: user.tid || user.sid,
      reviewernamea: user.name,
      revieweridb: (comment && comment.reviewerida) || article.authorid,
      reviewernameb: (comment && comment.reviewernamea) || article.authorName,
      content,
      replyContent: (comment && comment.content) || '',
      time: new Date(),
      articleid: article._id
    };

    if (!comment) {
      commentObj.commentid = commentObj._id;
      const commentInstance = new Comment(commentObj);
      console.log('commentobj');
      console.log(commentObj);

      commentInstance.save(err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Save Comment Successfully.');
          updateCommentbox(commentObj);
        }
      });
    } else {
      console.log(commentObj);
      commentObj.commentid = comment._id;
      const update = { $push: { comments: commentObj } };
      Comment.update({ _id: comment._id }, update, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Update Comment Successfully.');
          updateCommentbox(commentObj);
        }
      });
    }
  });
};
