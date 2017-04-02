import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Article, ArticleModal, PersonCard } from '../index';
import * as actionCreator from '../../actions/userInfoPannel';

@connect(
  state => ({
    user: state.async.login,
    collections: state.async.collections,
    article: state.async.article,
    followers: state.async.followers,
    userInfoPannelType: state.userInfo.userInfoPannelType,
    // userInfoPannel: state.userInfoPannel,
  }),
  actionCreator
)
export default class UserInfoPannel extends Component {
  static propTypes = {
    user: PropTypes.any,
    collections: PropTypes.any,
    article: PropTypes.any,
    followers: PropTypes.any,
    userInfoPannelType: PropTypes.number.isRequired,
    getCollections: PropTypes.func.isRequired,
    getFollowers: PropTypes.func.isRequired,
    showArticleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, getCollections, getFollowers } = this.props;

    if (user && user.sid) {
      getCollections(user.sid);
      getFollowers(user.sid);
    }
  }

  mapArticles = (articles, showArticleModal) => (
    articles.map((article, index) => (
      <Article
        article={article} key={index} width={300}
        showArticleModal={showArticleModal}
      />
    ))
  );

  mapPersonCard = persons => (
    persons.map((person, index) => (
      <PersonCard personid={person.sid || person.tid} person={person} key={index} />
    ))
  );

  render() {
    const styles = require('./UserInfoPannel.scss');
    const { collections, article, followers, userInfoPannelType, showArticleModal } = this.props;
    console.log(followers);

    return (
      <div className={styles.user_info_pannel}>
        {userInfoPannelType === 0 && <div className={styles.collection_wrpper}>
          {collections && this.mapArticles(collections, showArticleModal)}
          <ArticleModal showArticleModal={showArticleModal} article={article} />
        </div>}
        {userInfoPannelType === 1 && <div className={styles.follower_wrpper}>
          {followers && this.mapPersonCard(followers)}
        </div>}
        {userInfoPannelType === 2 && 'UserInfoPannel-2'}
        {userInfoPannelType === 3 && 'UserInfoPannel-3'}
      </div>
    );
  }
}
