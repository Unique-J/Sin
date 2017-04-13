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
            {article && <Article article={article} width={520} />}
            {comments &&
              <CommentList
                article={article} comments={comments}
                saveComment={saveComment} getComments={getComments}
                saveChildComment={saveChildComment}
              />
            }
          </div>
          <div className={styles.follow_list_wrapper}>
            {teachers && <FollowList users={teachers}/>}
          </div>
        </div>
      </div>
    );
  }
}
