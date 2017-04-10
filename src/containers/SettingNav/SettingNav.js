import React, { Component, PropTypes } from 'react';
import { MyInfo, MyPortrait } from '../index';

const navItemActive = {
  background: '#36465D',
};

export default class SettingNav extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1,
    };
  }

  selectTab = num => {
    // console.log(eventKey);
    this.setState({ activeTab: num });
  }

  render() {
    const styles = require('./SettingNav.scss');
    const { activeTab } = this.state;

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

        {activeTab === 1 && <MyInfo />}

        {activeTab === 2 && <MyPortrait />}
      </div>
    );
  }
}
