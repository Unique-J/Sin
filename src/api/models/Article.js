import mongoose from 'mongoose';

export default function createArticle() {
  const Schema = mongoose.Schema;
  const articleSchema = Schema({ // eslint-disable-line
    title: String,
    description: String,
    content: String,
    date: Date,
    commentid: Schema.Types.ObjectId,
    tags: String,
    viewNum: { type: Number, default: 0 },
    authorid: String,
    collectNum: { type: Number, default: 0 }
  });

  const Article = mongoose.model('article', articleSchema);

  Article.find({}, (err, articles) => {
    if (err) {
      console.error('==> Find Articles Error.');
    } else {
      if (articles.length === 0) {
        const article = new Article({
          title: '题目',
          description: '描述',
          content: '内容',
          date: new Date(),
          tags: '#1#2',
          viewNum: 24,
          authorid: 110001,
          collectNum: 8
        });
        article.save((error) => {
          if (error) {
            console.error(error);
          } else {
            console.info('==> Save Article successfully.');
          }
        });
      }
    }
  });
}
