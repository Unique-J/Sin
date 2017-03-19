import React, { Component, PropTypes } from 'react';
import { UserItem } from '../index';

export default class FollowList extends Component {
  render() {
    const styles = require('./FollowList.scss');
    return (
      <ul className={styles.list_container}>
        <li className={styles.list_header}>推荐的老师</li>
        <li><UserItem /></li>
        <li><UserItem /></li>
        <li><UserItem /></li>
        <li><UserItem /></li>
      </ul>
    );
  }
}
