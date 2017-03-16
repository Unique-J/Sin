import React from 'react';
import { browserHistory } from 'react-router';

function goToPages(link) {
  browserHistory.push(link);
}

function FirstMainPage() {
  const styles = require('./FirstMainPage.scss');
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>S</span>
      </header>
      <div className={styles.body}>
        <div className={styles.side} />
        <div className={styles.form_container}>
          <div className={styles.form}>
            <div>
              <h1 className={styles.title}>S . I . N</h1>
              <h2 className={styles.subtitle}>为你的所爱而来。</h2>
              <h2 className={styles.subtitle}>为你的发现停留。</h2>
            </div>
            <button
              className={`${styles.btn_start} btn`}
              onClick={() => { goToPages('/register'); }}
            >
              <span className={styles.text_start}>开 始 吧</span>
            </button>
            <button
              className={`${styles.btn_login} btn`}
              onClick={() => { goToPages('/login'); }}
            >
              <span className={styles.text_login}>登 录</span>
            </button>
          </div>
        </div>
        <div className={styles.side}>
          <span className={`${styles.glyphicon} glyphicon glyphicon-menu-right`}></span>
        </div>
      </div>
      <footer className={styles.footer}>
        <span className={styles.link}><a href="#" target="_blank">条款</a></span>
        <span className={styles.link}><a href="#" target="_blank">隐私</a></span>
        <span className={styles.link}><a href="#" target="_blank">工作机会</a></span>
        <span className={styles.link}><a href="#" target="_blank">客户支持</a></span>
      </footer>
    </div>
  );
}

export default FirstMainPage;
