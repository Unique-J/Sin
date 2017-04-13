import React, { Component, PropTypes } from 'react';
import { Headbar, Editor, LeftNav, UserInfoPannel } from '../index';
import { connect } from 'react-redux';
import * as actionCreator from '../../actions/userInfo';

@connect(
  state => ({
    user: state.async.login,
    // userInfo: state.userInfo
    person: state.async.person,
  }),
  actionCreator
)
class MyUserInfo extends Component {
  static propTypes = {
    user: PropTypes.any,
    person: PropTypes.any,
    // userInfo: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showEditor: PropTypes.func.isRequired,
    changePannelType: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { user, getPerson } = this.props;

    if (user) {
      getPerson(user.sid || user.tid);
    }
  }

  render() {
    const styles = require('./UserInfo.scss');
    const { person, showEditor, logout, changePannelType } = this.props;
    const uid = this.props.location.query.uid;
    // console.log(person);
    // console.log(this.props.location);
    // if (socket) {
    //   console.log(socket);
    // }

    return (
      <div className={styles.user_info_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        {person && <Editor showEditor={showEditor} person={person} />}
        <div className={styles.main_pannel}>
          <LeftNav changePannelType={changePannelType} />
          <UserInfoPannel uid={uid} />
        </div>
      </div>
    );
  }
}

export default function UserInfo(props) {
  return <MyUserInfo {...props} key={props.location.query.uid} />;
}

UserInfo.propTypes = {
  location: PropTypes.object.isRequired,
};
