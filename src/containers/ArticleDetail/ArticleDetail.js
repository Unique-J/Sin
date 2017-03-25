import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList, Editor, CommentList } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/articleDetail';

@connect(
  state => ({
    article: state.async.article,
    teachers: state.async.teachers,
    comments: state.async.comment
  }),
  actionCreators
)
export default class ArticleDetail extends Component {
  static propTypes = {
    location: PropTypes.any,
    teachers: PropTypes.any,
    article: PropTypes.any,
    comments: PropTypes.any,
    getArticle: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    showEditor: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const articleid = this.props.location.query.articleid;
    const { getArticle, getTeachers, getComments } = this.props;

    getArticle(articleid);
    getTeachers();
    getComments(articleid);
    // console.log(articleid);
  }

  render() {
    const styles = require('./ArticleDetail.scss');
    const { teachers, article, comments,
      showEditor, saveComment, getComments, saveChildComment, logout } = this.props;
    // console.log(comments);

    return (
      <div className={styles.article_detail_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        <Editor showEditor={showEditor} />
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
