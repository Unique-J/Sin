import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/articleModal';

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
    user: PropTypes.object.isRequired,
    showArticleModal: PropTypes.func.isRequired,
    collectArticle: PropTypes.func.isRequired,
    cancelCollectArticle: PropTypes.func.isRequired
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

    if (user.sid && student && article) {
      const collections = student.collections;
      if (collections.includes(article._id)) {
        return 1;
      }
    }

    return 0;
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
              style={{ fontSize: 30, fontWeight: 'bold', color: '#343434' }}
            >
              {article && article.title}
              <span
                style={{ fontSize: 14, color: '#969696', fontWeight: 500,
                marginLeft: 20 }}
              >{article && article.date}</span>
            </Modal.Title>
            <div className={styles.author_wrapper}>
              <div className={styles.author_portrait_wrapper}>
              </div>
              <div className={styles.author_info_wrapper}>
                <div className={styles.author_name}>作者</div>
                <div className={styles.author_description}>
                  介绍: 1231231321321231123123211312313
                </div>
              </div>
              {user.sid && <div className={styles.follow_wrapper}>
                <div className={styles.follow_link}>关注</div>
              </div>}
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modal_body}>
            <div
              className={styles.article_content}
              dangerouslySetInnerHTML={{ __html: article && article.content }}
            ></div>
          </Modal.Body>
          <Modal.Footer className={styles.modal_footer}>
            <div>
              <a
                style={{ float: 'left' }}
                className={styles.note_link}
              >1002&nbsp;热度</a>
              {user.sid && <div
                onClick={this.judgeCollection() ? this.cancelCollectArticle : this.collectArticle}
                className={`${styles.glyphicon_heart_link} glyphicon
                  ${this.judgeCollection() ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}
                style={this.judgeCollection() ? { color: '#D95E40' }
                  : {}}
              ></div>}
              {user.sid && <div
                className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
              ></div>}
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
