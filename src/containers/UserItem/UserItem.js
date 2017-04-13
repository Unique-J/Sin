import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../../actions/article';

@connect(
  state => ({
    student: state.async.student
  }),
  actionCreators
)
export default class UserItem extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    student: PropTypes.any,
    followTeacher: PropTypes.func.isRequired,
    cancelFollowTeacher: PropTypes.func.isRequired,
  };

  followUser = () => {
    console.log(12312);
  }

  followTeacher = () => {
    const { user, student, followTeacher } = this.props;
    followTeacher(user.tid, student.sid);
  }

  cancelFollowTeacher = () => {
    const { user, student, cancelFollowTeacher } = this.props;
    cancelFollowTeacher(user.tid, student.sid);
  }

  judgeFollow = () => {
    const { user, student } = this.props;

    if (student) {
      // console.log(student);
      // console.log(user.tid);
      const followers = student.followers;
      if (followers.includes(user.tid)) {
        return 1;
      }
    }

    return 0;
  }

  toUserPage = () => {
    const { user } = this.props;

    browserHistory.push(`/userpage?userid=${user.tid}`);
  }

  render() {
    const styles = require('./UserItem.scss');
    const { user } = this.props;
    // if (user.tid === '110001') console.log(user.portrait);

    return (
      <div className={styles.item_container}>
        <div
          className={styles.portrait_wrapper}
          onClick={this.toUserPage}
        >
          <div
            className={styles.portrait}
            style={{ background: `url(${user.portrait || '/StockSnap_01.jpg'})`,
            backgroundSize: 'cover' }}
          >
          </div>
        </div>
        <div
          className={styles.user_info}
          onClick={this.toUserPage}
        >
          <div className={styles.user_name}>{user.name}</div>
          <div className={styles.user_introduce}>{user.description}</div>
        </div>
        <div className={styles.follow_icon}>
          {!this.judgeFollow() && <button
            onClick={this.judgeFollow() ? this.cancelFollowTeacher : this.followTeacher}
            className={`glyphicon glyphicon-plus ${styles.follow_icon_btn}`}
          >
          </button>}
        </div>
      </div>
    );
  }
}
