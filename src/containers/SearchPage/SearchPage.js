import React, { Component, PropTypes } from 'react';
import { Headbar, Editor, UserResult, ArticleResult } from '../index';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/searchPage';

@connect(
  state => ({
    user: state.async.login,
    person: state.async.person,
  }),
  ActionCreators
)
export default class SearchPage extends Component {
  static propTypes = {
    user: PropTypes.any,
    person: PropTypes.any,
    location: PropTypes.object.isRequired,
    // searchCondition: PropTypes.string.isRequired,
    getPerson: PropTypes.func.isRequired,
    showEditor: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    // loadAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { user, getPerson } = this.props;

    if (user) {
      getPerson(user.sid || user.tid);
    }
  }

  render() {
    const styles = require('./SearchPage.scss');
    const { person, showEditor, logout } = this.props;
    const searchCondition = this.props.location.query.searchcondition;
    // console.log(searchCondition);

    return (
      <div className={styles.search_page_container}>
        <Headbar showEditor={showEditor} logout={logout} />
        {person && <Editor showEditor={showEditor} person={person} />}
        <div className={styles.result_wrapper}>
          <div className={styles.search_text}>{searchCondition}</div>
          <UserResult searchCondition={searchCondition} personType={0} />
          <UserResult searchCondition={searchCondition} personType={1} />
          <ArticleResult searchCondition={searchCondition} />
        </div>
      </div>
    );
  }
}

// export default function (props) {
//   console.log(props.location.query.searchcondition);
//   return (<MySearchPage {...props} key={props.location.query.searchcondition} />);
// }
