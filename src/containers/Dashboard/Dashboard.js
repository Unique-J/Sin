import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList } from '../index';

export default class Dashboard extends Component {
  render() {
    const styles = require('./Dashboard.scss');
    return (
      <div className={styles.dashboard_container}>
        <Headbar />
        <div className={styles.content_wrapper}>
          <ul className={styles.article_wrapper}>
            <li><Article /></li>
            <li><Article /></li>
          </ul>
          <div className={styles.follow_list_wrapper}>
            <FollowList />
          </div>
        </div>
      </div>
    );
  }
}
