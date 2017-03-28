import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { getDate, getTime } from '../../utils/utils';
import { connect } from 'react-redux';

@connect(
  state => ({
    // article: state.async.article,
    user: state.async.login,
    // comments: state.async.comment
  })
)
export default class Reply extends Component {
  static propTypes = {
    user: PropTypes.any,
    comment: PropTypes.object.isRequired,
    reply: PropTypes.object.isRequired,
    saveChildComment: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      replyFlag: false
    };
  }

  // componentDidMount() {
    // const { reply, getComment } = this.props;

    // setInterval(() => getComment(reply.commentid), 5000);
  // }

  showReplyBlock = () => {
    this.setState({ replyFlag: !this.state.replyFlag });
  }

  saveComment = () => {
    const { user, reply, saveChildComment, getComment } = this.props;
    const content = this.replyInput.value;
    // console.log(reply);

    if (user) {
      saveChildComment(content, user, reply, reply.commentid);
      getComment(reply.commentid);
      this.showReplyBlock();
      this.replyInput.value = '';
    }
  }

  render() {
    const styles = require('./Reply.scss');
    const { comment, user } = this.props;

    return (
      <div className={styles.reply_container}>
        <div className={styles.left_wrapper}>
          <div className={styles.line1}></div>
          <div className={styles.time}>
            <div>{getDate(comment.time)}</div>
            <div>{getTime(comment.time)}</div>
          </div>
          <div className={styles.line2}></div>
        </div>
        <div className={styles.right_wrapper}>
          <div className={styles.header}>
            <div className={styles.portrait_wrapper}>
              <div className={styles.portrait}></div>
            </div>
            <div className={styles.reply_wrapper}>
              <div className={styles.reply}>
                <span className={styles.reviewernamea}>{comment.reviewernamea}</span>
                回复
                <span className={styles.reviewernameb}>{comment.reviewernameb}</span>:
                <span className={styles.reply_content}>{comment.content}</span>
              </div>
              {user && comment.reviewernamea !== user.name && <div
                className={styles.reply_link}
                onClick={this.showReplyBlock}
              >回复</div>}
            </div>
          </div>
          {this.state.replyFlag && <div className={styles.footer}>
            <FormGroup
              controlId="formBasicText"
              className={styles.form_group}
            >
              <FormControl
                type="text"
                placeholder="请输入评论"
                className={styles.form_control}
                inputRef={ref => { this.replyInput = ref; }}
              />
              <div
                className={styles.reply_button}
                onClick={this.saveComment}
              >评论</div>
            </FormGroup>
          </div>}
        </div>
      </div>
    );
  }
}
