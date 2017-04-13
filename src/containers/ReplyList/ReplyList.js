import React, { Component, PropTypes } from 'react';
import { Headbar, Editor, ReplyCard } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/replyList';

@connect(
  state => ({
    user: state.async.login,
    commentbox: state.async.commentbox,
    person: state.async.person,
  }),
  actionCreators
)
export default class ReplyList extends Component {
  static propTypes = {
    user: PropTypes.any,
    commentbox: PropTypes.any,
    person: PropTypes.any,
    showEditor: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getCommentbox: PropTypes.func.isRequired,
    getArticle: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, getCommentbox, getPerson } = this.props;

    if (user) {
      const userid = user.tid || user.sid;

      getCommentbox(userid);
      getPerson(userid);
      this.t = setInterval(() => getCommentbox(userid), 5000);
    }
    // getCommentbox(userid);
    // console.log(this.props.commentbox);
  }

  componentWillUnmount() {
    const { user } = this.props;

    if (user) {
      clearInterval(this.t);
    }
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
    const { commentbox, person, showEditor, logout, getArticle, saveChildComment } = this.props;
    // console.log(commentbox);

    return (
      <div className={styles.reply_list_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        {person && <Editor showEditor={showEditor} person={person} />}
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
