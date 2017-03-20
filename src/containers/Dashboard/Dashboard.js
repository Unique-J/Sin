import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList, Editor } from '../index';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/dashboard';

@connect(
  state => ({
    dashboard: state.dashboard,
    articles: state.async.articles
  }),
  ActionCreators
)
export default class Dashboard extends Component {
  static propTypes = {
    dashboard: PropTypes.any,
    articles: PropTypes.any,
    showEditor: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getArticles().then(() => console.log('Get Articles Successfully'));
  }

  mapArticles = articles => (
    articles.map((article, index) => (
      <Article article={article} key={index} />
    ))
  );

  render() {
    const styles = require('./Dashboard.scss');
    const articles = this.props.articles;
    console.log(articles);

    return (
      <div className={styles.dashboard_container}>
        <Headbar showEditor={this.props.showEditor} />
        <Editor showEditor={this.props.showEditor} />
        <div className={styles.content_wrapper}>
          <ul className={styles.article_wrapper}>
            <li>
              {articles ? this.mapArticles(articles) : ''}
            </li>
          </ul>
          <div className={styles.follow_list_wrapper}>
            <FollowList />
          </div>
        </div>
      </div>
    );
  }
}
