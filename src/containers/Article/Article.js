import React, { Component, PropTypes } from 'react';

export default class Article extends Component {
  render() {
    const styles = require('./Article.scss');
    return (
      <article
        className={styles.post_container}
        style={{ width: 275 }}
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
          <div className={styles.post_tag_draggable}>
            <a
              href="#"
              className={styles.post_tag_link}
            >#tag</a>
          </div>
        </section>
        <section className={styles.post_footer}>
          <a
            href="#"
            className={styles.note_link}
          >footer</a>
          <a
            href="#"
            className={`${styles.glyphicon_heart_link} glyphicon glyphicon-heart-empty`}
          ></a>
          <a
            href="#"
            className={`${styles.glyphicon_chat_link} glyphicon glyphicon-edit`}
          ></a>
        </section>
      </article>
    );
  }
}
