import React, { Component, PropTypes } from 'react';
// import { Headbar, Editor } from '../index';
import { connect } from 'react-redux';
// import * as actionCreator from '../../actions/userInfo';

const PANEL_TYPE = {
  COLLECTION_PANEL: 0,
  FOLLOWERS_PANEL: 1,
  MESSAGE_PANEL: 2,
  SETTING_PANEL: 3
};

const navChoiceActive = {
  background: 'hsla(0, 0%, 100%, .07)'
};

@connect(
  state => ({
    user: state.async.login,
    userInfoPannelType: state.userInfo.userInfoPannelType,
  }),
  // actionCreator
)
export default class LeftNav extends Component {
  static propTypes = {
    userInfoPannelType: PropTypes.number.isRequired,
    changePannelType: PropTypes.func.isRequired
  };
  render() {
    const styles = require('./LeftNav.scss');
    const { userInfoPannelType, changePannelType } = this.props;

    return (
      <div className={styles.left_nav_container}>
        <ul className={styles.nav_wrapper}>
          <li
            className={styles.nav_choice_wrapper}
            onClick={() => changePannelType(PANEL_TYPE.MESSAGE_PANEL)}
            style={userInfoPannelType === 2 ? navChoiceActive : {}}
          >
            <div className={styles.choice}>私信</div>
            <div className={styles.vice_choice}>查看私信、发起私信</div>
          </li>
          <li
            className={styles.nav_choice_wrapper}
            onClick={() => changePannelType(PANEL_TYPE.COLLECTION_PANEL)}
            style={userInfoPannelType === 0 ? navChoiceActive : {}}
          >
            <div className={styles.choice}>收藏</div>
            <div className={styles.vice_choice}>查看收藏的文章</div>
          </li>
          <li
            className={styles.nav_choice_wrapper}
            onClick={() => changePannelType(PANEL_TYPE.FOLLOWERS_PANEL)}
            style={userInfoPannelType === 1 ? navChoiceActive : {}}
          >
            <div className={styles.choice}>关注</div>
            <div className={styles.vice_choice}>查看关注的老师、学生</div>
          </li>
          <li
            className={styles.last_nav_choice_wrapper}
            onClick={() => changePannelType(PANEL_TYPE.SETTING_PANEL)}
            style={userInfoPannelType === 3 ? navChoiceActive : {}}
          >
            <div className={styles.choice}>设置</div>
            <div className={styles.vice_choice}>账户基本设置</div>
          </li>
        </ul>
      </div>
    );
  }
}
