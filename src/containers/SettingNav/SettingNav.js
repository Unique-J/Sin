import React, { Component, PropTypes } from 'react';
import { MyInfo, MyPortrait } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/settingNav';

const navItemActive = {
  background: '#36465D',
};

@connect(
  state => ({
    user: state.async.login,
    person: state.async.person,
  }),
  actionCreators
)
export default class SettingNav extends Component {
  static propTypes = {
    user: PropTypes.any,
    person: PropTypes.any,
    getPerson: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeTab: 1,
    };
  }

  componentDidMount() {
    const { user, getPerson } = this.props;
    const uid = user.sid || user.tid;

    getPerson(uid);
  }

  selectTab = num => {
    // console.log(eventKey);
    this.setState({ activeTab: num });
  }

  render() {
    const styles = require('./SettingNav.scss');
    const { activeTab } = this.state;
    const { person } = this.props;

    return (
      <div className={styles.setting_nav_container}>
        <nav className={styles.nav}>
          <span
            className={styles.nav_item}
            style={activeTab === 1 ? navItemActive : {}}
            onClick={() => this.selectTab(1)}
          >我的信息</span>
          <span
            className={styles.nav_item}
            style={activeTab === 2 ? navItemActive : {}}
            onClick={() => this.selectTab(2)}
          >我的头像</span>
        </nav>

        {activeTab === 1 && person && <MyInfo person={person} />}

        {activeTab === 2 && <MyPortrait />}
      </div>
    );
  }
}
