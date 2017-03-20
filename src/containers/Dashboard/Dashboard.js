import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList, Editor } from '../index';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/dashboard';

@connect(
  state => (
    { dashboard: state.dashboard }
  ),
  ActionCreators
)
export default class Dashboard extends Component {
  static propTypes = {
    dashboard: PropTypes.any,
    showEditor: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Dashboard.scss');

    return (
      <div className={styles.dashboard_container}>
        <Headbar showEditor={this.props.showEditor} />
        <Editor showEditor={this.props.showEditor} />
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
