import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList, Editor, CommentList } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/articleDetail';

@connect(
  state => ({
    user: state.async.login,
    article: state.async.article,
    teachers: state.async.teachers,
    comments: state.async.comment,
    person: state.async.person,
  }),
  actionCreators
)
export default class ArticleDetail extends Component {
  static propTypes = {
    user: PropTypes.any,
    location: PropTypes.any,
    teachers: PropTypes.any,
    article: PropTypes.any,
    comments: PropTypes.any,
    person: PropTypes.any,
    getArticle: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    showEditor: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const articleid = this.props.location.query.articleid;
    const { user, getPerson, getArticle, getTeachers, getComments } = this.props;

    getArticle(articleid);
    getTeachers();
    getComments(articleid);

    if (user) {
      getPerson(user.sid || user.tid);
    }
    // console.log(articleid);
  }

  render() {
    const styles = require('./ArticleDetail.scss');
    const { teachers, article, comments, person,
      showEditor, saveComment, getComments, saveChildComment, logout } = this.props;
    // console.log(comments);

    return (
      <div className={styles.article_detail_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        {person && <Editor showEditor={showEditor} person={person} />}
        <div className={styles.content_wrapper}>
          <div className={styles.article_wrapper}>
            {article && <Article article={article} width={520} type={1} />}
            {comments &&
              <CommentList
                article={article} comments={comments}
                saveComment={saveComment} getComments={getComments}
                saveChildComment={saveChildComment}
              />
            }
          </div>
          <div className={styles.follow_list_wrapper}>
            {person && person.sid && teachers && <FollowList users={teachers}/>}
            {person && person.tid && <div className={styles.tips}>
              <div className={styles.tip_header}>注意事项</div>
              <div className={styles.tip}>1. 教师无法评论自己的文章</div>
              <div className={styles.tip}>2. 教师可以对学生的评论进行回复</div>
              <div className={styles.tip}>3. 教师无法回复自己的评论</div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}
