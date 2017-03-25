import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';

@connect(
  state => ({
    user: state.async.login
  })
)
export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.any,
    user: PropTypes.any,
    article: PropTypes.any,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      replyFlag: false
    };
  }

  formatTime = (time) => {
    const fdate = time.substring(0, 10);
    const ftime = time.substring(11, 19);
    return `${fdate}  ${ftime}`;
  }

  reply = () => {
    this.setState({ replyFlag: !this.state.replyFlag });
  }

  saveComment = () => {
    const { user, article, getComments, saveComment } = this.props;
    const content = this.comment_input.value;

    saveComment(article, content, user);
    getComments(article._id);

    this.comment_input.value = '';
    this.setState({ replyFlag: !this.state.replyFlag });
  }

  render() {
    const styles = require('./Comment.scss');
    const { comment, user } = this.props;
    // console.log(comment);

    return (
      <div className={styles.comment_container}>
        <div className={styles.portrait_wrapper}>
          <image src="/StockSnap_01.jpg" className={styles.portrait} />
        </div>
        <div className={styles.comment_wrapper}>
          <span className={styles.username}>{comment && comment.reviewernamea}</span>
          <span style={{ color: '#198FFF' }}>&nbsp;回复&nbsp;</span>
          <span className={styles.username}>{comment && comment.reviewernameb}</span>
          <span>&nbsp;&nbsp;</span>
          <span className={styles.comment}>{comment && comment.content}</span>
          <div className={styles.reply}>
            <span className={styles.reply_time}>{comment && this.formatTime(comment.time)}</span>
            {comment.reviewernamea !== user.name && <span
              className={styles.reply_link}
              onClick={this.reply}
            >
              回&nbsp;复
            </span>}
          </div>
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
        </div>
      </div>
    );
  }
}
