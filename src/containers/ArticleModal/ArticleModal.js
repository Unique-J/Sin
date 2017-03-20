import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ArticleModal extends Component {
  constructor() {
    super();
    this.state = {
      followState: false
    };
  }

  followAuthor = () => {
    this.setState({ followState: !this.state.followState });
  }

  render() {
    const styles = require('./ArticleModal.scss');
    return (
      <div>
        <Modal
          bsSize="large" aria-labelledby="modal-container"
          className={styles.modal_container} show
          dialogClassName={styles.dialog}
        >
          <Modal.Header closeButton className={styles.modal_header}>
            <Modal.Title
              id="article-title"
              className={styles.article_title}
              style={{ fontSize: 30, fontWeight: 'bold', color: '#343434' }}
            >
              文章标题
              <span
                style={{ fontSize: 14, color: '#969696', fontWeight: 500,
                marginLeft: 20 }}
              >2016-10-08</span>
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
              <div className={styles.follow_wrapper}>
                <div className={styles.follow_link}>关注</div>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modal_body}>
            <div className={styles.article_content}>123</div>
          </Modal.Body>
          <Modal.Footer className={styles.modal_footer}>
            <div>
              <a
                style={{ float: 'left' }}
                className={styles.note_link}
              >1002&nbsp;热度</a>
              <div
                onClick={this.followAuthor}
                className={`${styles.glyphicon_heart_link} glyphicon
                  ${this.state.followState ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}
                style={this.state.followState ? { color: '#D95E40' }
                  : {}}
              ></div>
              <div
                className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
              ></div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
