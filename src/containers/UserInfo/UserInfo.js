import React, { Component, PropTypes } from 'react';
import { Headbar, Editor, LeftNav, UserInfoPannel } from '../index';
import { connect } from 'react-redux';
import * as actionCreator from '../../actions/userInfo';

@connect(
  state => ({
    user: state.async.login,
    userInfo: state.userInfo
  }),
  actionCreator
)
export default class UserInfo extends Component {
  static propTypes = {
    user: PropTypes.any,
    userInfo: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showEditor: PropTypes.func.isRequired,
    changePannelType: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };
  render() {
    const styles = require('./UserInfo.scss');
    const { showEditor, logout, changePannelType } = this.props;
    const uid = this.props.location.query.uid;
    // console.log(this.props.location);

    return (
      <div className={styles.user_info_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        <Editor showEditor={showEditor} />
        <div className={styles.main_pannel}>
          <LeftNav changePannelType={changePannelType} />
          <UserInfoPannel uid={uid} />
        </div>
      </div>
    );
  }
}
