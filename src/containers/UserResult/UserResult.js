import React, { Component, PropTypes } from 'react';
import { PersonCard } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/userResult';

@connect(
  state => ({
    user: state.async.login,
    students: state.async.searchStudents,
    teachers: state.async.searchTeachers,
  }),
  actionCreators
)
class MyUserResult extends Component {
  static propTypes = {
    user: PropTypes.any,
    students: PropTypes.any,
    teachers: PropTypes.any,
    personType: PropTypes.number.isRequired,
    searchCondition: PropTypes.string.isRequired,
    searchStudents: PropTypes.func.isRequired,
    searchTeachers: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { searchCondition, personType, searchTeachers, searchStudents } = this.props;
    const searchUser = personType === 0 ? searchTeachers : searchStudents;
    // console.log(searchCondition);

    searchUser(searchCondition);
  }

  mapPersonCard = persons => (
    persons.map((person, index) => (
      <PersonCard personid={person.sid || person.tid} key={index} />
    ))
  )

  render() {
    const styles = require('./UserResult.scss');
    const { teachers, students, personType } = this.props;
    // const { searchCondition } = this.props;
    // console.log(searchCondition);
    // if (teachers) console.log(teachers.tid);
    // console.log(students);

    return (
      <div className={styles.user_result_container}>
        <div className={styles.personcard_wrapper}>
          {personType === 0 && teachers && teachers.length > 0 && this.mapPersonCard(teachers)}
          <div className={styles.result_text}>
            {personType === 0 && teachers && teachers.length === 0 && '无符合该条件的老师'}
          </div>
          {personType === 1 && students && this.mapPersonCard(students)}
          <div className={styles.result_text}>
            {personType === 1 && students && students.length === 0 && '无符合该条件的学生'}
          </div>
        </div>
      </div>
    );
  }
}

export default function UserReault(props) {
  // console.log(props.searchCondition);
  return (<MyUserResult {...props} key={props.searchCondition} />);
}

UserReault.propTypes = {
  searchCondition: PropTypes.string.isRequired
};
