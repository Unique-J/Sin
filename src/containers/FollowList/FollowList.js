import React, { Component, PropTypes } from 'react';
import { UserItem } from '../index';

export default class FollowList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  mapUsers = users => (
    users.map((user, index) => (
      <UserItem user={user} key={index} />
    ))
  );

  render() {
    const styles = require('./FollowList.scss');
    const { users } = this.props;

    return (
      <ul className={styles.list_container}>
        <li className={styles.list_header}>推荐的老师</li>
        <li>{this.mapUsers(users)}</li>
      </ul>
    );
  }
}
