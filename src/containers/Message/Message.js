import React, { Component, PropTypes } from 'react';
import { getDay, getTime } from '../../utils/utils';
import { browserHistory } from 'react-router';
// import { connect } from 'react-redux';
// import * as actionCreators from '../../actions/message';

// @connect(
//   state => ({
//     person: state.async.person
//   }),
//   actionCreators
// )
export default class Message extends Component {
  static propTypes = {
    person: PropTypes.any,
    message: PropTypes.object.isRequired,
    // getPerson: PropTypes.func.isRequired,
  };

  // componentDidMount() {
  //   const { message, getPerson } = this.props;

  //   getPerson(message.senderid);
  // }

  toChatPannel = message => {
    browserHistory.push(`/userinfo?uid=${message.senderid}`);
  }

  render() {
    const styles = require('./Message.scss');
    const { message } = this.props;
    // console.log(person);

    return (
      <div
        className={styles.message_container}
        onClick={() => this.toChatPannel(message)}
      >
        <div className={styles.portrait}></div>
        <div className={styles.right_wrapper}>
          <div className={styles.top_wrapper}>
            <span className={styles.name}>Name</span>
            <span className={styles.date}>
              {`${getDay(message.time)} ${getTime(message.time)}`}
            </span>
          </div>
          <div className={styles.bottom_wrapper}>{message.content}</div>
        </div>
      </div>
    );
  }
}

// export default function Message(props) {
//   console.log(props.message);
//   return <MyMessage {...props} key={props.message} />;
// }

// Message.propTypes = {
//   message: PropTypes.object.isRequired
// };
