import React, { Component, PropTypes } from 'react';
import { Article, ArticleModal } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/articleResult';

@connect(
  state => ({
    // user: state.async.login,
    article: state.async.article,
    articles: state.async.searchArticles,
  }),
  actionCreators
)
class MyArticleResult extends Component {
  static propTypes = {
    article: PropTypes.any,
    articles: PropTypes.any,
    searchCondition: PropTypes.string.isRequired,
    showArticleModal: PropTypes.func.isRequired,
    searchArticles: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { searchCondition, searchArticles } = this.props;

    searchArticles(searchCondition);
  }

  mapArticles = (articles, showArticleModal) => (
    articles.map((article, index) => (
      <Article
        article={article} key={index} width={300} type={0}
        showArticleModal={showArticleModal}
      />
    ))
  );

  render() {
    const styles = require('./ArticleResult.scss');
    const { article, articles, showArticleModal } = this.props;
    // if (articles) console.log(articles);

    return (
      <div className={styles.article_result_container}>
        {articles && (articles.length > 0) && this.mapArticles(articles, showArticleModal)}
        <div className={styles.result_text}>
          {articles && (articles.length === 0) && '无符合该条件的文章'}
        </div>
        <ArticleModal showArticleModal={showArticleModal} article={article} />
      </div>
    );
  }
}

export default function ArticleResult(props) {
  return <MyArticleResult {...props} key={props.searchCondition} />;
}

ArticleResult.propTypes = {
  searchCondition: PropTypes.string.isRequired
};
