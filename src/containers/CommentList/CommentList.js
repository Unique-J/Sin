import React, { Component, PropTypes } from 'react';
import { Comment } from '../index';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/commentList';

@connect(
  state => ({
    user: state.async.login,
    person: state.async.person,
  }),
  actionCreators
)
export default class CommentList extends Component {
  static propTypes = {
    user: PropTypes.any,
    person: PropTypes.any,
    article: PropTypes.any,
    comments: PropTypes.any,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    saveChildComment: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, getPerson } = this.props;

    if (user) {
      getPerson(user.sid || user.tid);
    }
  }

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
    const { person, article, getComments, saveComment } = this.props;
    const content = this.comment_input.value;

    if (person) {
      saveComment(article, content, person);
      getComments(article._id);

      this.comment_input.value = '';
    }
  }

  render() {
    const styles = require('./CommentList.scss');
    const { user, person, comments, article,
      getComments, saveComment, saveChildComment } = this.props;
    // console.log(123);
    // console.log(comments);

    return (
      <div
        className={styles.commentlist_container}
        style={comments.length || (user && user.sid) ? { padding: 10 } : {}}
      >
        {user && user.sid && <FormGroup
          controlId="formBasicText"
          className={styles.input_group}
        >
          {person && <div
            className={styles.portrait_wrapper}
            style={{ background: `url(${person.portrait || 'StockSnap_01.jpg'})`,
            backgroundSize: 'cover' }}
          />}
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
