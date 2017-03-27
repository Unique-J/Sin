import React, { Component, PropTypes } from 'react';
import { Headbar, Editor, ReplyCard } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/replyList';

@connect(
  state => ({
    user: state.async.login,
    commentbox: state.async.commentbox
  }),
  actionCreators
)
export default class ReplyList extends Component {
  static propTypes = {
    user: PropTypes.any,
    commentbox: PropTypes.any,
    showEditor: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getCommentbox: PropTypes.func.isRequired,
    getArticle: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, getCommentbox } = this.props;

    if (user) {
      const userid = user.tid || user.sid;

      getCommentbox(userid);
      setInterval(() => getCommentbox(userid), 5000);
    }
    // getCommentbox(userid);
    // console.log(this.props.commentbox);
  }

  mapReplyCard = (commentbox, getArticle, saveChildComment) => (
    commentbox.map((reply, index) => (
      <ReplyCard
        reply={reply} key={index}
        getArticle={getArticle}
        saveChildComment={saveChildComment}
      />
    ))
  )

  render() {
    const styles = require('./ReplyList.scss');
    const { commentbox, showEditor, logout, getArticle, saveChildComment } = this.props;
    // console.log(commentbox);

    return (
      <div className={styles.reply_list_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        <Editor showEditor={showEditor} />
        <div className={styles.main}>
          <div className={styles.reply_list}>
            {commentbox && this.mapReplyCard(commentbox, getArticle, saveChildComment)}
          </div>
          <div className={styles.right_module}>13</div>
        </div>
      </div>
    );
  }
}
