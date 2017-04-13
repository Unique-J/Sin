import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList, Editor, ArticleModal } from '../index';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/dashboard';

@connect(
  state => ({
    user: state.async.login,
    dashboard: state.dashboard,
    article: state.async.article,
    articles: state.async.articles,
    teachers: state.async.teachers,
    student: state.async.student,
    person: state.async.person,
  }),
  ActionCreators
)
export default class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.any,
    dashboard: PropTypes.any,
    article: PropTypes.any,
    articles: PropTypes.any,
    teachers: PropTypes.any,
    student: PropTypes.any,
    person: PropTypes.any,
    showEditor: PropTypes.func.isRequired,
    showArticleModal: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired,
    getArticlesByTid: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    // loadAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.props.loadAuth();
    const { user, getArticlesByTid, getArticles, getStudent, getTeachers, getPerson } = this.props;

    if (user && user.tid) {
      getArticlesByTid(user.tid);
    }

    if (user && user.sid) {
      getArticles();
      getStudent(user.sid);
    }
    // this.props.getArticles().then(() => console.log('Get Articles Successfully'));
    getTeachers();
    getPerson(user.sid || user.tid);
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
    const styles = require('./Dashboard.scss');
    const { user, articles, teachers, person, article,
      showEditor, showArticleModal, logout } = this.props;

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
          {user && user.sid && <div className={styles.follow_list_wrapper}>
            {teachers ? <FollowList users={teachers}/> : ''}
          </div>}
        </div>
      </div>
    );
  }
}
