import React, { Component, PropTypes } from 'react';

export default class UserItem extends Component {
  followUser = () => {
    console.log(12312);
  }

  render() {
    const styles = require('./UserItem.scss');
    return (
      <a href="#" className={styles.item_container}>
        <div className={styles.portrait_wrapper}>
          <image src="/StockSnap_01.jpg" className={styles.portrait} />
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_name}>wnq-music</div>
          <div className={styles.user_introduce}>MUSIC QUOTES</div>
        </div>
        <div className={styles.follow_icon}>
          <button
            onClick={this.followUser}
            className={`glyphicon glyphicon-plus ${styles.follow_icon_btn}`}
          >
          </button>
        </div>
      </a>
    );
  }
}
