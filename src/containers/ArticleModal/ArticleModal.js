import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../../actions/articleModal';
import { formatTime } from '../../utils/utils';

@connect(
  state => ({
    user: state.async.login,
    student: state.async.student,
    dashboard: state.dashboard
  }),
  actionCreators
)
export default class ArticleModal extends Component {
  static propTypes = {
    article: PropTypes.any,
    student: PropTypes.any,
    dashboard: PropTypes.any,
    user: PropTypes.any,
    showArticleModal: PropTypes.func.isRequired,
    collectArticle: PropTypes.func.isRequired,
    cancelCollectArticle: PropTypes.func.isRequired,
    followTeacher: PropTypes.func.isRequired,
    cancelFollowTeacher: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      followState: false
    };
  }

  collectArticle = () => {
    // this.setState({ followState: !this.state.followState });
    const { student, article, collectArticle } = this.props;
    collectArticle(article._id, student.sid);
  }

  cancelCollectArticle = () => {
    // this.setState({ followState: !this.state.followState });
    const { student, article, cancelCollectArticle } = this.props;
    cancelCollectArticle(article._id, student.sid);
  }

  judgeCollection = () => {
    const { user, article, student } = this.props;

    if (user && user.sid && student && article) {
      const collections = student.collections;
      if (collections.includes(article._id)) {
        return 1;
      }
    }

    return 0;
  }

  followTeacher = () => {
    const { student, article, followTeacher } = this.props;
    followTeacher(article.authorid, student.sid);
  }

  cancelFollowTeacher = () => {
    const { student, article, cancelFollowTeacher } = this.props;
    cancelFollowTeacher(article.authorid, student.sid);
  }

  judgeFollow = () => {
    const { user, article, student } = this.props;

    if (user && user.sid && student && article) {
      const followers = student.followers;
      if (followers.includes(article.authorid)) {
        return 1;
      }
    }

    return 0;
  }

  toArticleDetail = () => {
    const { article, showArticleModal } = this.props;

    if (article) {
      browserHistory.push(`/articledetail?articleid=${article._id}`);
      showArticleModal();
    }
  }

  toUserPage = () => {
    const { article, showArticleModal } = this.props;

    browserHistory.push(`/userpage?userid=${article.authorid}`);
    showArticleModal();
  }

  render() {
    const styles = require('./ArticleModal.scss');
    const { showArticleModalFlag } = this.props.dashboard;
    const { user, article, showArticleModal } = this.props;

    return (
      <div>
        <Modal
          bsSize="large" aria-labelledby="modal-container"
          className={styles.modal_container}
          show={showArticleModalFlag}
          onHide={showArticleModal}
          dialogClassName={styles.dialog}
        >
          <Modal.Header closeButton className={styles.modal_header}>
            <Modal.Title
              id="article-title"
              className={styles.article_title}
              style={{ fontSize: 30, fontWeight: 'bold', color: '#343434', cursor: 'pointer' }}
              onClick={this.toArticleDetail}
            >
              {article && article.title}
              <span
                style={{ fontSize: 14, color: '#969696', fontWeight: 500,
                marginLeft: 20 }}
              >{article && formatTime(article.date)}</span>
            </Modal.Title>
            <div className={styles.author_wrapper}>
              <div
                className={styles.author_portrait_wrapper}
                onClick={this.toUserPage}
              >
              </div>
              <div
                className={styles.author_info_wrapper}
                onClick={this.toUserPage}
              >
                <div className={styles.author_name}>作者:&nbsp;{article && article.authorName}</div>
                <div className={styles.author_description}>
                  介绍:&nbsp;{article && article.description}
                </div>
              </div>
              {user && user.sid && <div className={styles.follow_wrapper}>
                <div
                  className={styles.follow_link}
                  onClick={this.judgeFollow() ? this.cancelFollowTeacher : this.followTeacher}
                >{this.judgeFollow() ? '取消关注' : '关注'}</div>
              </div>}
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modal_body}>
            <div
              className={styles.article_content}
              dangerouslySetInnerHTML={{ __html: article && article.content }}
              onClick={this.toArticleDetail}
            ></div>
          </Modal.Body>
          <Modal.Footer className={styles.modal_footer}>
            <div>
              <a
                style={{ float: 'left' }}
                className={styles.note_link}
              >1002&nbsp;热度</a>
              {user && user.sid && <div
                onClick={this.judgeCollection() ? this.cancelCollectArticle : this.collectArticle}
                className={`${styles.glyphicon_heart_link} glyphicon
                  ${this.judgeCollection() ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}
                style={this.judgeCollection() ? { color: '#D95E40' }
                  : {}}
              ></div>}
              {user && user.sid && <div
                className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
              ></div>}
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
