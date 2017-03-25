import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

  render() {
    const styles = require('./UserItem.scss');
    const { user } = this.props;

    return (
      <a href="#" className={styles.item_container}>
        <div className={styles.portrait_wrapper}>
          <image src="/StockSnap_01.jpg" className={styles.portrait} />
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_name}>{user.name}</div>
          <div className={styles.user_introduce}>MUSIC QUOTES</div>
        </div>
        <div className={styles.follow_icon}>
          {!this.judgeFollow() && <button
            onClick={this.judgeFollow() ? this.cancelFollowTeacher : this.followTeacher}
            className={`glyphicon glyphicon-plus ${styles.follow_icon_btn}`}
          >
          </button>}
        </div>
      </a>
    );
  }
}
