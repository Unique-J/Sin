import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { ContactUser } from '../index';
import { connect } from 'react-redux';
import * as actionCreator from '../../actions/contactNav';

const contactTypeActive = {
  borderBottom: '1px solid rgba(255, 255, 255, 0.6)'
};

const USER_TYPE = {
  TEACHER: 0,
  STUDENT: 1
};

@connect(
  state => ({
    user: state.async.login,
    users: state.async.searchUsers,
    followers: state.async.userFollowers,
  }),
  actionCreator
)
export default class ContactNav extends Component {
  static propTypes = {
    user: PropTypes.any,
    users: PropTypes.any,
    followers: PropTypes.any,
    searchUsers: PropTypes.func.isRequired,
    getFollowers: PropTypes.func.isRequired,
    getUserFollowers: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      userType: USER_TYPE.TEACHER,
      searchFlag: false
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user && user.sid) {
      if (this.searchInput) {
        this.searchInput.onkeypress = e => {
          if (e.keyCode === 13) {
            this.searchUsers();
            // this.chooseTeacher();
          }
        };
      }

      this.chooseTeacher();
    }
  }

  onFocus = () => {
    const { user, getFollowers } = this.props;

    if (user) {
      getFollowers(user.sid);
      this.setState({ searchFlag: true });
    }
  }

  onBlur = () => {
    const searchCondition = this.searchInput.value;

    if (!searchCondition) {
      this.setState({ searchFlag: false });
    }
  }

  searchUsers = () => {
    const searchCondition = this.searchInput.value;
    const { user, searchUsers } = this.props;

    // this.setState({
    //   userType: 0,
    // });

    if (user) {
      // console.log(user);
      searchUsers(user.sid, searchCondition);
    }
  }

  chooseTeacher = () => {
    const { user, getUserFollowers } = this.props;

    if (user) {
      getUserFollowers(user.sid, USER_TYPE.TEACHER);
      this.setState({ userType: USER_TYPE.TEACHER });
    }
  }

  chooseStudent = () => {
    const { user, getUserFollowers } = this.props;

    if (user) {
      getUserFollowers(user.sid, USER_TYPE.STUDENT);
      this.setState({ userType: USER_TYPE.STUDENT });
    }
  }

  mapContactUsers = followers => (
    followers.map((follower, index) => (
      <ContactUser follower={follower} key={index} />
    ))
  )

  render() {
    const styles = require('./ContactNav.scss');
    const { user, users, followers } = this.props;
    const { userType, searchFlag } = this.state;
    // console.log(users);
    // console.log(followers);

    return (
      <div className={styles.contact_nav_container}>
        {user && user.sid && <div>
          <div className={styles.contact_nav_top_wrapper}>
            <span className={styles.contact_text}>联系人</span>
          </div>
          <FormGroup
            controlId="formBasicText"
            className={styles.form_group}
          >
            <FormControl
              type="text"
              placeholder="输入联系人"
              className={styles.form_control}
              inputRef={ref => { this.searchInput = ref; }}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </FormGroup>
          {!searchFlag && <div className={styles.contact_type_wrapper}>
            <div
              className={styles.contact_type_teacher}
              style={userType === 0 ? contactTypeActive : {}}
              onClick={this.chooseTeacher}
            >老&nbsp;师</div>
            <div
              className={styles.contact_type_student}
              style={userType === 1 ? contactTypeActive : {}}
              onClick={this.chooseStudent}
            >学&nbsp;生</div>
          </div>}
          <div
            className={styles.contact_user_wrapper}
            style={searchFlag ? { height: 455 } : { height: 416 }}
          >
            {!searchFlag && followers && this.mapContactUsers(followers)}

            {searchFlag && users && this.mapContactUsers(users)}

            {((followers && followers.length === 0)
              || (users && users.length === 0))
              && <div className={styles.no_result_text}>
                <span className={`glyphicon glyphicon-info-sign ${styles.no_result_glyphicon}`} />
                没有符合条件的结果
              </div>}
          </div>
        </div>}

        {user && user.tid && <div>Teacher</div>}
      </div>
    );
  }
}
