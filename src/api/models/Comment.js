import mongoose from 'mongoose';

export default function createComment() {
  const Schema = mongoose.Schema;
  const commentSchema = Schema({  // eslint-disable-line
    reviewerida: String,
    reviewernamea: String,
    revieweridb: String,
    reviewernameb: String,
    content: String,
    time: Date,
    articleid: Schema.Types.ObjectId
  });

  const Comment = mongoose.model('comment', commentSchema);

  Comment.find({}, (err, comments) => {
    if (err) {
      console.error(err);
    } else {
      if (comments.length === 0) {
        const comment = new Comment({
          reviewerida: '13110033139',
          reviewernamea: 'YangJi',
          revieweridb: '110001',
          reviewernameb: 'YangJi',
          content: '这是一条评论',
          time: new Date(),
          articleid: '58cfcea4eeec4b3d4cbed6ea'
        });
        comment.save((error) => {
          if (error) {
            console.error(error);
          } else {
            console.info('==> Save Comment successfully.');
          }
        });
      }
    }
  });
}
