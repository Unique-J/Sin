import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList } from '../index';
import { connect } from 'react-redux';

@connect(
  state => ({
    teachers: state.async.teachers,
    articles: state.async.articles,
  }),
)
export default class ArticleDetail extends Component {
  static propTypes = {
    teachers: PropTypes.any,
    articles: PropTypes.any
  };

  render() {
    const styles = require('./ArticleDetail.scss');
    const { teachers, articles } = this.props;
    console.log(articles + ' ' + teachers);

    return (
      <div className={styles.article_detail_container}>
        <Headbar showEditor={() => { console.log(1); }} />
        <div className={styles.content_wrapper}>
          <div className={styles.article_wrapper}>
            {articles ? <Article article={articles[0]} key={index} width={520} /> : ''}
          </div>
          <div className={styles.follow_list_wrapper}>
            {teachers ? <FollowList users={teachers}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}
