import React, { Component, PropTypes } from 'react';
import { Reply } from '../index';
import { formatTime } from '../../utils/utils';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { FormGroup, FormControl, Modal } from 'react-bootstrap';
import * as actionCreators from '../../actions/replyCard';

@connect(
  state => ({
    article: state.async.article,
    user: state.async.login,
    comments: state.async.comment
  }),
  actionCreators
)
export default class ReplyCard extends Component {
  static propTypes = {
    article: PropTypes.any,
    user: PropTypes.any,
    comments: PropTypes.any,
    reply: PropTypes.object.isRequired,
    getArticle: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      replyBlockFlag: false,
      showReplyFlag: false
    };
  }

  componentDidMount() {
    const { reply, getArticle, getComment } = this.props;

    getArticle(reply.articleid);

    // getComment(reply.commentid);
    // setInterval(() => getComment(reply.commentid), 5000);
  }

  toArticleDetail = () => {
    const { article } = this.props;

    if (article) {
      browserHistory.push(`/ArticleDetail?articleid=${article._id}`);
    }
  }

  replyBlock = () => {
    this.setState({ replyBlockFlag: !this.state.replyBlockFlag });
  }

  saveComment = () => {
    const { user, reply, saveChildComment } = this.props;
    const content = this.replyInput.value;
    // console.log(reply);

    if (user) {
      saveChildComment(content, user, reply, reply.commentid);
      this.replyBlock();
      this.replyInput.value = '';
    }
  }

  showReplyModal = () => {
    const { reply, getComment, comments } = this.props;

    // console.log(reply.commentid);
    getComment(reply.commentid)
      .then(() => {
        this.setState({ showReplyFlag: !this.state.showReplyFlag });
        console.log(comments);
      });
  }

  mapReply = (comments, reply, saveChildComment, getComment) => (
    comments.map((comment, index) => (
      <Reply
        comment={comment} reply={reply} key={index}
        saveChildComment={saveChildComment}
        getComment={getComment}
      />
    ))
  )

  render() {
    const styles = require('./ReplyCard.scss');
    const { article, reply, comments, saveChildComment, getComment } = this.props;
    // console.log(comments);

    return (
      <div className={styles.reply_card_container}>
        <div className={styles.reply_card_wrapper}>
          <div className={styles.reply_wrapper}>
            <div className={styles.portrait_wrapper}>
              <div className={styles.portrait}></div>
            </div>
            <div className={styles.reply}>
              <div className={styles.reviewer_name_a}>{reply.reviewernamea}</div>
              <div className={styles.reply_content}>
                回复<span className={styles.reviewer_name_b}>@{reply.reviewernameb}</span>
                :{reply.content}
              </div>
            </div>
          </div>
          <div className={styles.my_comment_wrapper}>
            <div className={styles.blank_block}></div>
            <div
              className={styles.my_comment}
              onClick={this.toArticleDetail}
            >
              {reply.replyContent ?
                <div>
                  <span className={styles.comment}>我回复@{reply.reviewernamea}的评论:</span>
                  <span>{reply.replyContent}</span>
                </div> :
                <div>
                  <span className={styles.comment}>评论我的文章:</span>
                  <span>{article && article.content}</span>
                </div>
              }
            </div>
          </div>
          <div className={styles.reply_time_wrapper}>
            <div className={styles.blank_block}></div>
            <div className={styles.reply_time}>{formatTime(reply.time)}</div>
          </div>
        </div>
        <div className={styles.link_wrapper}>
          <span
            className={styles.watch_link}
            onClick={this.showReplyModal}
          >查看对话</span>
          <span
            onClick={this.replyBlock}
            className={styles.reply_link}
          >回复</span>
        </div>
        {this.state.replyBlockFlag && <FormGroup
          controlId="formBasicText"
          className={styles.form_group}
        >
          <div className={styles.blank_block}></div>
          <div className={styles.reply_block}>
            <FormControl
              type="text"
              placeholder="请输入回复"
              className={styles.reply_input}
              inputRef={ref => { this.replyInput = ref; }}
            />
            <div
              className={styles.reply_button}
              onClick={this.saveComment}
            >回复</div>
          </div>
        </FormGroup>}

        <Modal
          show={this.state.showReplyFlag}
          onHide={this.showReplyModal}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              <b>查看对话</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {comments && this.mapReply(comments, reply, saveChildComment, getComment)}
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}
