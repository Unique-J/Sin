import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList } from '../index';

export default class ArticleDetail extends Component {
  render() {
    const styles = require('./ArticleDetail.scss');
    return (
      <div className={styles.article_detail_container}>
        <Headbar />
        <div className={styles.content_wrapper}>
          <div className={styles.article_wrapper}>
            <Article />
          </div>
          <div className={styles.follow_list_wrapper}>
            <FollowList />
          </div>
        </div>
      </div>
    );
  }
}
