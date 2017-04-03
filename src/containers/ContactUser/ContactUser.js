import React, { Component, PropTypes } from 'react';

export default class ContactUser extends Component {
  static propTypes = {
    follower: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./ContactUser.scss');
    const { follower } = this.props;

    return (
      <div className={styles.contact_user_container}>
        <div className={styles.portrait}></div>
        <div className={styles.user_wrapper}>
          <div className={styles.name}>{follower.name}</div>
          <div className={styles.description}>{follower.description}</div>
        </div>
      </div>
    );
  }
}
