import React, { Component, PropTypes } from 'react';

export default class MyPortrait extends Component {
  render() {
    const styles = require('./MyPortrait.scss');

    return (
      <div className={styles.my_portrait_container}>
        MyPortrait
      </div>
    );
  }
}
