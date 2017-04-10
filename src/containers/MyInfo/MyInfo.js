import React, { Component, PropTypes } from 'react';
import { InfoItem } from '../index';

const OPERATE_TYPE = {
  WATCH: 'WATCH',
  EDITOR: 'EDITOR',
  PWD: 'PWD',
};

export default class MyInfo extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired,
  };

  render() {
    const styles = require('./MyInfo.scss');
    const { person } = this.props;

    return (
      <div className={styles.my_info_container}>
        <InfoItem title={'姓名'} type={OPERATE_TYPE.PWD} content={person.name} />
        <InfoItem title={'学号 / 工号'} type={OPERATE_TYPE.WATCH} content={person.sid || person.tid} />
        <InfoItem title={'性别'} type={OPERATE_TYPE.WATCH} content={person.gender} />
        <InfoItem title={'邮箱'} type={OPERATE_TYPE.WATCH} content={person.email} />
        <InfoItem title={'所在地'} type={OPERATE_TYPE.WATCH} content={person.location} />
        <InfoItem title={'描述'} type={OPERATE_TYPE.EDITOR} content={person.description} />
      </div>
    );
  }
}
