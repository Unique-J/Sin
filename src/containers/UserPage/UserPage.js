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
        article={article} key={index} width={520} type={0}
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
          <div className={styles.user_introduce_wrapper}>
            {user && user.sid && person && <PersonCard personid={userid} person={person} />}
            <div className={styles.tips}>
              <div className={styles.tip_header}>说&nbsp;明</div>
              <div className={styles.tip}>1. 若当前为教师主页，则显示该教师所发表的所有文章</div>
              <div className={styles.tip}>2. 若当前为学生主页，则显示该学生所收藏的所有文章</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
