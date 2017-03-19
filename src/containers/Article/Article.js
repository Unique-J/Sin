import React, { Component, PropTypes } from 'react';

export default class Article extends Component {
  constructor() {
    super();
    this.state = {
      followState: false
    };
  }

  componentDidMount() {
    const tagDraggable = this.refs.tagDraggable;
    console.log(tagDraggable);

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
    };

    window.onmouseup = () => {
      params.dragFlag = false;
      params.afterMoveX = tagDraggable.style.transform.split('px')[0].substring(10);

      if (Math.abs(params.deltaX) > (params.tagWidth - 245)) {
        tagDraggable.style.transform = `translate(-${params.tagWidth - 245}px, 0)`;
      }
      if (params.afterMoveX > 0) {
        tagDraggable.style.transform = 'translate(0, 0)';
      }
    };
  }

  followAuthor = () => {
    this.setState({ followState: !this.state.followState });
  }

  render() {
    const styles = require('./Article.scss');
    return (
      <article
        className={styles.post_container}
        style={{ width: 520 }}
      >
        <section className={styles.post_header}>
          <div className={styles.portrait}></div>
          <a
            className={styles.author_link}
            href="#"
          >thegoodvybe</a>
          <a
            className={styles.follow_link}
            href="#"
          >关注</a>
        </section>
        <section className={styles.post_content}>
          content "You’ll get over it…” It’s the clichés
          that cause the trouble. To lose someone you love
          is to alter your life for ever. You don’t get over
          it because ‘it” is the person you loved. The pain
          stops, there are new people, but the gap never
          closes. How could it? The particularness of someone
          who mattered enough to grieve over is not made anodyne
          by death. This hole in my heart is in the shape of you
          and no-one else can fit it. Why would I want them to?"
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
          <div
            onClick={this.followAuthor}
            className={`${styles.glyphicon_heart_link} glyphicon
              ${this.state.followState ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}
            style={this.state.followState ? { color: '#D95E40' }
              : {}}
          ></div>
          <div
            className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
          ></div>
        </section>
      </article>
    );
  }
}
