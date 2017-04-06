import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class ContactUser extends Component {
  static propTypes = {
    follower: PropTypes.object.isRequired
  };

  toChatPage = () => {
    const { follower } = this.props;
    console.log(follower.sid || follower.tid);
    browserHistory.push(`/userinfo?uid=${follower.sid || follower.tid}`);
  }

  render() {
    const styles = require('./ContactUser.scss');
    const { follower } = this.props;

    return (
      <div
        className={styles.contact_user_container}
        onClick={this.toChatPage}
      >
        <div className={styles.portrait}></div>
        <div className={styles.user_wrapper}>
          <div className={styles.name}>{follower.name}</div>
          <div className={styles.description}>{follower.description}</div>
        </div>
      </div>
    );
  }
}
