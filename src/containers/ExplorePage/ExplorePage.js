import React, { Component, PropTypes } from 'react';
import { Headbar, Article, FollowList, Editor, ArticleModal } from '../index';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/explorePage';

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
export default class ExplorePage extends Component {
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
    getArticlesByHeat: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired,
    getArticlesByTid: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    // loadAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.props.loadAuth();
    const { user, getArticlesByTid, getArticlesByHeat,
      getStudent, getTeachers, getPerson } = this.props;

    if (user && user.tid) {
      getArticlesByTid(user.tid);
    }

    if (user && user.sid) {
      getArticlesByHeat();
      getStudent(user.sid);
    }
    // this.props.getArticles().then(() => console.log('Get Articles Successfully'));
    getTeachers();
    getPerson(user.sid || user.tid);
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
    const styles = require('./ExplorePage.scss');
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
          <div className={styles.follow_list_wrapper}>
            {user && user.sid && teachers && <FollowList users={teachers}/>}
            <div className={styles.tips}>
              <div className={styles.tip_header}>说&nbsp;明</div>
              <div className={styles.tip}>1. 若当前用户为教师，则右侧显示的为该教师所发表的所有文章</div>
              <div className={styles.tip}>2. 若当前用户为学生，则右侧显示的为该学生所收藏的所有文章</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
