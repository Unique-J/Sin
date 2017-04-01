import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/article';
import { transformTagsToArray } from '../../utils/utils';
import { browserHistory } from 'react-router';

@connect(
  state => ({
    user: state.async.login,
    student: state.async.student,
    articleModal: state.article
  }),
  actionCreators
)
export default class Article extends Component {
  static propTypes = {
    user: PropTypes.any,
    student: PropTypes.any,
    article: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    showArticleModal: PropTypes.any,
    getArticle: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired,
    collectArticle: PropTypes.func.isRequired,
    cancelCollectArticle: PropTypes.func.isRequired,
    followTeacher: PropTypes.func.isRequired,
    cancelFollowTeacher: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      followState: false
    };
  }

  componentDidMount() {
    const tagDraggable = this.refs.tagDraggable;
    const { width, user, getStudent } = this.props;

    const params = {
      startX: 0,
      currentX: 0,
      deltaX: 0,
      dragFlag: false,
      tagWidth: 0,
      afterMoveX: 0
    };

    tagDraggable.onmousedown = e => {
      params.startX = e.clientX;
      params.dragFlag = true;
      params.tagWidth = tagDraggable.offsetWidth;
    };

    tagDraggable.onmousemove = e => {
      if (params.dragFlag) {
        params.currentX = e.clientX;
        params.deltaX = params.currentX - params.startX;
        tagDraggable.style.transform = `translate(${params.deltaX}px, 0)`;
      }

      window.onmouseup = () => {
        params.dragFlag = false;
        params.afterMoveX = tagDraggable.style.transform.split('px')[0].substring(10);

        if (Math.abs(params.deltaX) > (params.tagWidth - (width - 30))) {
          tagDraggable.style.transform = `translate(-${params.tagWidth - (width - 30)}px, 0)`;
        }
        if (params.afterMoveX > 0) {
          tagDraggable.style.transform = 'translate(0, 0)';
        }
      };
    };

    if (user && user.sid) {
      getStudent(user.sid);
    }
  }

  collectArticle = () => {
    // this.setState({ followState: !this.state.followState });
    const { student, article, collectArticle } = this.props;
    collectArticle(article._id, student.sid);
  }

  cancelCollectArticle = () => {
    // this.setState({ followState: !this.state.followState });
    const { student, article, cancelCollectArticle } = this.props;
    cancelCollectArticle(article._id, student.sid);
  }

  judgeCollection = () => {
    const { user, article, student } = this.props;

    if (user && user.sid && student && article) {
      const collections = student.collections;
      if (collections.includes(article._id)) {
        return 1;
      }
    }

    return 0;
  }

  followTeacher = () => {
    const { student, article, followTeacher } = this.props;
    followTeacher(article.authorid, student.sid);
  }

  cancelFollowTeacher = () => {
    const { student, article, cancelFollowTeacher } = this.props;
    cancelFollowTeacher(article.authorid, student.sid);
  }

  judgeFollow = () => {
    const { user, article, student } = this.props;

    if (user && user.sid && student && article) {
      const followers = student.followers;
      if (followers.includes(article.authorid)) {
        return 1;
      }
    }

    return 0;
  }

  toUserPage = uid => {
    browserHistory.push(`/userpage?userid=${uid}`);
  }

  toArticleDetail = articleid => {
    browserHistory.push(`/articledetail?articleid=${articleid}`);
  }

  render() {
    const styles = require('./Article.scss');
    const { user, article, width, showArticleModal, getArticle } = this.props;
    // console.log(showArticleModal);
    // console.log(article);

    return (
      <article
        className={styles.post_container}
        style={{ width }}
      >
        <section className={styles.post_header}>
          <div
            className={styles.portrait}
            onClick={() => this.toUserPage(article.authorid)}
          ></div>
          <a
            className={styles.author_link}
            href={`/userpage?userid=${article.authorid}`}
          >{article.authorName}</a>
          {user && user.sid && <div
            className={styles.follow_link}
            onClick={this.judgeFollow() ? this.cancelFollowTeacher : this.followTeacher}
          >{this.judgeFollow() ? '取消关注' : '关注'}</div>}
        </section>
        <section
          className={styles.post_content}
          dangerouslySetInnerHTML={{
            __html: width === 520 ? article.content : `${article.description.substring(0, 37)}...`
          }}
          onClick={() => { showArticleModal(); getArticle(article._id); }}
        >
        </section>
        <section className={styles.post_tag}>
          <div className={styles.post_tag_container}>
            <div
              ref="tagDraggable"
              className={styles.post_tag_draggable}
            >
              <a
                href="#"
                className={styles.post_tag_link}
              >{transformTagsToArray(article.tags)}</a>
            </div>
          </div>
        </section>
        <section className={styles.post_footer}>
          <a
            className={styles.note_link}
          >1002&nbsp;热度</a>
          {user && user.sid && <div
            onClick={this.judgeCollection() ? this.cancelCollectArticle : this.collectArticle}
            className={`${styles.glyphicon_heart_link} glyphicon
              ${this.judgeCollection() ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}
            style={this.judgeCollection() ? { color: '#D95E40' }
              : {}}
          ></div>}
          {user && user.sid && <div
            className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
            onClick={() => this.toArticleDetail(article._id)}
          ></div>}
        </section>
      </article>
    );
  }
}
