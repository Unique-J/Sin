import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { FormGroup, FormControl, Modal, Button } from 'react-bootstrap';
import { ChildComment } from '../index';

@connect(
  state => ({
    user: state.async.login,
    person: state.async.person,
  })
)
export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.any,
    user: PropTypes.any,
    article: PropTypes.any,
    person: PropTypes.any,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      replyFlag: false,
      commentModalFlag: false,
    };
  }

  componentDidMount() {
    const { article, getComments } = this.props;

    this.t = setInterval(() => getComments(article._id), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  formatTime = (time) => {
    const fdate = time.substring(0, 10);
    const ftime = time.substring(11, 19);
    return `${fdate}  ${ftime}`;
  }

  reply = () => {
    this.setState({ replyFlag: !this.state.replyFlag });
    // console.log(this.props.comment);
  }

  saveComment = () => {
    const { person, article, comment, getComments, saveComment } = this.props;
    const content = this.comment_input.value;

    if (person) {
      saveComment(article, content, person, comment);
      getComments(article._id);

      this.comment_input.value = '';
      this.setState({ replyFlag: !this.state.replyFlag });
    }
  }

  mapChildComment = (comment, saveChildComment, getComments) => (
    comment.comments.map((childComment, index) => (
      index < 2 && <ChildComment
        childComment={childComment} key={index} commentid={comment._id}
        saveChildComment={saveChildComment} getComments={getComments}
      />
    ))
  )

  mapAllChildComment = (comment, saveChildComment, getComments) => (
    comment.comments.map((childComment, index) => (
      <ChildComment
        childComment={childComment} key={index} commentid={comment._id}
        saveChildComment={saveChildComment} getComments={getComments}
      />
    ))
  )

  showAllComments = () => {
    this.setState({ commentModalFlag: !this.state.commentModalFlag });
  }

  toUserPage = uid => {
    browserHistory.push(`/userpage?userid=${uid}`);
  }

  render() {
    const styles = require('./Comment.scss');
    const { comment, user, saveChildComment, getComments } = this.props;
    // console.log(comment);

    return (
      <div className={styles.comment_container}>
        <div className={styles.portrait_wrapper}>
          {comment && <div
            className={styles.portrait}
            onClick={comment ? () => this.toUserPage(comment.reviewerida) : ''}
            style={{ backgroundImage: `url(${comment.reviewerportraita || 'StockSnap_01.jpg'})`,
            backgroundSize: 'cover' }}
          />}
        </div>
        <div className={styles.comment_wrapper}>
          <span
            className={styles.username}
            onClick={comment ? () => this.toUserPage(comment.reviewerida) : ''}
          >{comment && comment.reviewernamea}</span>
          <span style={{ color: '#198FFF' }}>&nbsp;回复&nbsp;</span>
          <span
            className={styles.username}
            onClick={comment ? () => this.toUserPage(comment.revieweridb) : ''}
          >{comment && comment.reviewernameb}</span>
          <span>&nbsp;&nbsp;</span>
          <span className={styles.comment}>{comment && comment.content}</span>
          <div className={styles.reply}>
            <span className={styles.reply_time}>{comment && this.formatTime(comment.time)}</span>
            {user && comment.reviewernamea !== user.name && <span
              className={styles.reply_link}
              onClick={this.reply}
            >
              回&nbsp;复
            </span>}
          </div>

          {comment && comment.comments
          && this.mapChildComment(comment, saveChildComment, getComments)}

          {this.state.replyFlag && <FormGroup
            controlId="formBasicText"
            className={styles.input_group}
          >
            <FormControl
              type="text"
              placeholder="请输入评论"
              className={styles.input_control}
              inputRef={ref => { this.comment_input = ref; }}
            />
            <div
              className={styles.reply_button}
              onClick={this.saveComment}
            >评&nbsp;论</div>
          </FormGroup>}
          {comment && comment.comments && (comment.comments.length > 0) &&
            <div className={styles.reply_count_wrapper}>
              <span
                className={styles.reply_count_link}
                onClick={this.showAllComments}
              >
                共{comment && comment.comments && (comment.comments.length + 1)}条回复
              </span>
            </div>}
        </div>

        <Modal
          bsSize="large" aria-labelledby="contained-modal-title-lg"
          show={this.state.commentModalFlag}
          dialogClassName={styles.modal_container}
          onHide={this.showAllComments}
        >
          <Modal.Header closeButton>
            <div style={{ fontSize: 16, fontWeight: 700 }}>子评论</div>
          </Modal.Header>
          <Modal.Body>
            {comment && comment.comments &&
            this.mapAllChildComment(comment, saveChildComment, getComments)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.showAllComments} className={styles.close_btn}>关&nbsp;闭</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
