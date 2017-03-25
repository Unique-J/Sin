import React, { Component, PropTypes } from 'react';
import { Comment } from '../index';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

@connect(
  state => ({
    user: state.async.login,
  })
)
export default class CommentList extends Component {
  static propTypes = {
    user: PropTypes.any,
    article: PropTypes.any,
    comments: PropTypes.any,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired
  };

  mapComments = (comments, article, getComments, saveComment, saveChildComment) => (
    comments.map((comment, index) => (
      <Comment
        comment={comment} key={index} article={article}
        getComments={getComments} saveComment={saveComment}
        saveChildComment={saveChildComment}
      />
    ))
  );

  saveComment = () => {
    const { user, article, getComments, saveComment } = this.props;
    const content = this.comment_input.value;

    saveComment(article, content, user);
    getComments(article._id);

    this.comment_input.value = '';
  }

  render() {
    const styles = require('./CommentList.scss');
    const { user, comments, article, getComments, saveComment, saveChildComment } = this.props;
    // console.log(123);
    // console.log(comments);

    return (
      <div
        className={styles.commentlist_container}
        style={comments.length || user.sid ? { padding: 10 } : {}}
      >
        {user && user.sid && <FormGroup
          controlId="formBasicText"
          className={styles.input_group}
        >
          <div className={styles.portrait_wrapper}></div>
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
        {this.mapComments(comments, article, getComments, saveComment, saveChildComment)}
      </div>
    );
  }
}
