import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/personCard';
import { browserHistory } from 'react-router';

@connect(
  state => ({
    user: state.async.login,
    // person: state.async.person,
    student: state.async.student,
  }),
  actionCreators
)
class MyPersonCard extends Component {
  static propTypes = {
    user: PropTypes.any,
    student: PropTypes.any,
    person: PropTypes.object.isRequired,
    // article: PropTypes.object.isRequired,
    personid: PropTypes.string.isRequired,
    // getPerson: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired,
    followTeacher: PropTypes.func.isRequired,
    cancelFollowTeacher: PropTypes.func.isRequired,
    changePannelType: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, getStudent } = this.props;

    // getPerson(personid);

    if (user && user.sid) {
      getStudent(user.sid);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { personid, getPerson } = this.props;
  //   console.log(nextProps.personid + ' ' + personid);
  //   if (nextProps.personid !== personid) {
  //     getPerson(nextProps.personid);
  //   }
  // }

  followTeacher = () => {
    const { student, personid, followTeacher } = this.props;
    // console.log(student);
    followTeacher(personid, student.sid);
  }

  cancelFollowTeacher = () => {
    const { student, personid, cancelFollowTeacher } = this.props;
    // console.log(student);
    cancelFollowTeacher(personid, student.sid);
  }

  judgeFollow = () => {
    const { user, personid, student } = this.props;
    // getPerson(personid);
    // console.log(person);
    // console.log(personid);

    if (user && user.sid && student) {
      const followers = student.followers;
      if (followers.includes(personid)) {
        return 1;
      }
    }

    return 0;
  }

  sendMessage = personid => {
    // console.log(personid);
    const { changePannelType } = this.props;

    changePannelType(2);
    browserHistory.push(`/userinfo?uid=${personid}`);
  }

  toUserPage = userid => {
    browserHistory.push(`/userpage?userid=${userid}`);
  }

  render() {
    const styles = require('./PersonCard.scss');
    const { person, personid, student } = this.props;
    // console.log(personid);
    // console.log(this.props.student);

    return (
      <div className={styles.person_card_container}>
        <div
          className={styles.top_wrapper}
          onClick={() => this.toUserPage(personid)}
        >
          <div
            style={{ backgroundImage: `url(${person.portrait || 'StockSnap_01.jpg'})` }}
            className={styles.portrait_wrapper}
          />
          <div className={styles.name_sex_wrapper}>
            {person && person.name}&nbsp;
            <span
              className={person && person.gender === 'male' ? styles.sex_male : styles.sex_female}
            >
              {person && person.gender === 'male' ? '♂' : '♀'}
            </span>
          </div>
          <div className={styles.description_wrapper}>
            简介: {person && person.description}
          </div>
        </div>
        <div className={styles.bottom_wrapper}>
          <div className={styles.location_wrapper}>
            {person && person.location}
          </div>
          <div
            className={styles.button_wrapper}
            style={student && student.sid === personid ? { display: 'none' } : { display: 'block' }}
          >
            <span
              className={styles.follow_button}
              onClick={this.judgeFollow() ? this.cancelFollowTeacher : this.followTeacher}
            >
              {this.judgeFollow() ? '取消关注' : '关注'}
            </span>
            <span
              className={styles.message_button}
              onClick={() => this.sendMessage(personid)}
            >私信</span>
          </div>
        </div>
      </div>
    );
  }
}

export default function PersonCard(props) {
  // console.log(props.personid);
  return (<MyPersonCard {...props} key={props.personid} />);
}

PersonCard.propTypes = {
  personid: PropTypes.string.isRequired
};
