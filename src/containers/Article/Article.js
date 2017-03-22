import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/article';

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
    user: PropTypes.object.isRequired,
    student: PropTypes.any,
    article: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    showArticleModal: PropTypes.func.isRequired,
    getArticle: PropTypes.func.isRequired,
    collectArticle: PropTypes.func.isRequired,
    cancelCollectArticle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      followState: false
    };
  }

  componentDidMount() {
    const tagDraggable = this.refs.tagDraggable;
    const width = this.props.width;

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

    if (user.sid && student && article) {
      const collections = student.collections;
      if (collections.includes(article._id)) {
        return 1;
      }
    }

    return 0;
  }

  render() {
    const styles = require('./Article.scss');
    const { user, article, width, showArticleModal, getArticle } = this.props;
    // console.log(showArticleModal);

    return (
      <article
        className={styles.post_container}
        style={{ width }}
      >
        <section className={styles.post_header}>
          <div className={styles.portrait}></div>
          <a
            className={styles.author_link}
            href="/counter"
          >thegoodvybe</a>
          {user.sid && <a
            className={styles.follow_link}
            href="#"
          >关注</a>}
        </section>
        <section
          className={styles.post_content}
          dangerouslySetInnerHTML={{
            __html: article.content
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
              >#tag1</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag</a>
              <a
                href="#"
                className={styles.post_tag_link}
              >#tag0</a>
            </div>
          </div>
        </section>
        <section className={styles.post_footer}>
          <a
            className={styles.note_link}
          >1002&nbsp;热度</a>
          {user.sid && <div
            onClick={this.judgeCollection() ? this.cancelCollectArticle : this.collectArticle}
            className={`${styles.glyphicon_heart_link} glyphicon
              ${this.judgeCollection() ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}
            style={this.judgeCollection() ? { color: '#D95E40' }
              : {}}
          ></div>}
          {user.sid && <div
            className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
          ></div>}
        </section>
      </article>
    );
  }
}
