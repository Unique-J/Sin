import React, { Component, PropTypes } from 'react';
import { Headbar, Article, PersonCard, Editor, ArticleModal } from '../index';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/userpage';

@connect(
  state => ({
    user: state.async.login,
    person: state.async.person,
    // user: state.async.user,
    dashboard: state.dashboard,
    article: state.async.article,
    articles: state.async.articles,
    // teachers: state.async.teachers,
    student: state.async.student
  }),
  ActionCreators
)
export default class UserPage extends Component {
  static propTypes = {
    location: PropTypes.any,
    user: PropTypes.any,
    dashboard: PropTypes.any,
    article: PropTypes.any,
    articles: PropTypes.any,
    person: PropTypes.any,
    // teachers: PropTypes.any,
    student: PropTypes.any,
    showEditor: PropTypes.func.isRequired,
    showArticleModal: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
    getArticlesByTid: PropTypes.func.isRequired,
    getArticlesBySid: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    // loadAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.props.loadAuth();
    const userid = this.props.location.query.userid;
    const { getArticlesByTid, getArticlesBySid, getPerson } = this.props;
    const getArticlesById = userid.length === 6 ? getArticlesByTid : getArticlesBySid;

    getArticlesById(userid);
    getPerson(userid);
    // if (userid.length === 6) {
    //   getArticlesByTid(userid);
    // }
    // if (userid.length === 11) {
    //   getArticlesBySid(userid);
    // }
  }

  mapArticles = (articles, showArticleModal) => (
    articles.map((article, index) => (
      <Article
        article={article} key={index} width={520}
        showArticleModal={showArticleModal}
      />
    ))
  );

  render() {
    const styles = require('./UserPage.scss');
    const { user, person, articles, article, showEditor, showArticleModal, logout } = this.props;
    const userid = this.props.location.query.userid;

    return (
      <div className={styles.dashboard_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        {person && <Editor showEditor={showEditor} person={person} />}
        <ArticleModal showArticleModal={showArticleModal} article={article} />
        <div className={styles.content_wrapper}>
          <ul className={styles.article_wrapper}>
            <li>
              {articles ? this.mapArticles(articles, showArticleModal) : ''}
            </li>
          </ul>
          {user && user.sid && person && <div className={styles.user_introduce_wrapper}>
            <PersonCard personid={userid} person={person} />
          </div>}
        </div>
      </div>
    );
  }
}
