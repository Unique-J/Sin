import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

@connect(
  state => ({
    user: state.async.login
  })
)
export default class ChildComment extends Component {
  static propTypes = {
    childComment: PropTypes.any,
    user: PropTypes.any,
    commentid: PropTypes.any,
    saveChildComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      childReplyFlag: false,
    };
  }

  formatTime = (time) => {
    const fdate = time.substring(0, 10);
    const ftime = time.substring(11, 19);
    return `${fdate}  ${ftime}`;
  }

  saveChildComment = () => {
    // const { user, article, comment, getComments, saveComment } = this.props;
    // const content = this.child_comment_input.value;

    // saveComment(article, content, user, comment);
    // getComments(article._id);
    const { user, childComment, commentid, saveChildComment, getComments } = this.props;
    const content = this.child_comment_input.value;
    // console.log(user);
    // console.log(childComment);
    // console.log(commentid);

    if (user) {
      saveChildComment(content, user, childComment, commentid);
      getComments(childComment.articleid);

      this.child_comment_input.value = '';
      this.setState({ childReplyFlag: !this.state.childReplyFlag });
    }
  }

  childReply = () => {
    this.setState({ childReplyFlag: !this.state.childReplyFlag });
  }

  render() {
    const styles = require('./ChildComment.scss');
    const { childComment, user } = this.props;

    return (
      <div className={styles.child_comments_wrapper}>
        <span className={styles.username}>{childComment && childComment.reviewernamea}</span>
        <span style={{ color: '#198FFF' }}>&nbsp;回复&nbsp;</span>
        <span className={styles.username}>{childComment && childComment.reviewernameb}</span>
        <span>&nbsp;&nbsp;</span>
        <span className={styles.comment}>{childComment && childComment.content}</span>
        <div className={styles.reply}>
          <span className={styles.reply_time}>{childComment
            && this.formatTime(childComment.time)}
          </span>
          {user && childComment.reviewernamea !== user.name && <span
            className={styles.reply_link}
            onClick={this.childReply}
          >
            回&nbsp;复
          </span>}
        </div>
        {this.state.childReplyFlag && <FormGroup
          controlId="childText"
          className={styles.input_group}
        >
          <FormControl
            type="text"
            placeholder="请输入评论"
            className={styles.input_control}
            inputRef={ref => { this.child_comment_input = ref; }}
          />
          <div
            className={styles.reply_button}
            onClick={this.saveChildComment}
          >评&nbsp;论</div>
        </FormGroup>}
      </div>
    );
  }
}
