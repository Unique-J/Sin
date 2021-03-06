import mongoose from 'mongoose';

export default function createComment() {
  const Schema = mongoose.Schema;
  const commentSchema = Schema({  // eslint-disable-line
    reviewerida: String,
    reviewernamea: String,
    reviewerportraita: String,
    revieweridb: String,
    reviewernameb: String,
    reviewerportraitb: String,
    content: String,
    replyContent: String,
    time: Date,
    comments: [],
    articleid: Schema.Types.ObjectId
  });

  const Comment = mongoose.model('comment', commentSchema);

  // Comment.find({}, (err, comments) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     if (comments.length === 0) {
  //       const comment = new Comment({
  //         reviewerida: '13110033139',
  //         reviewernamea: 'YangJi',
  //         revieweridb: '110001',
  //         reviewernameb: 'YanJ',
  //         content: '这是一条评论',
  //         replyContent: '',
  //         time: new Date(),
  //         articleid: '58cfcea4eeec4b3d4cbed6ea'
  //       });
  //       comment.save((error) => {
  //         if (error) {
  //           console.error(error);
  //         } else {
  //           console.info('==> Save Comment successfully.');
  //         }
  //       });
  //     }
  //   }
  // });
}
