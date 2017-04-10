import React, { Component, PropTypes } from 'react';
import { InfoItem } from '../index';

const OPERATE_TYPE = {
  WATCH: 'WATCH',
  EDITOR: 'EDITOR',
  PWD: 'PWD',
};

export default class MyInfo extends Component {
  render() {
    const styles = require('./MyInfo.scss');

    return (
      <div className={styles.my_info_container}>
        <InfoItem title={'姓名'} type={OPERATE_TYPE.PWD} />
        <InfoItem title={'学号 / 工号'} type={OPERATE_TYPE.WATCH} />
        <InfoItem title={'性别'} type={OPERATE_TYPE.WATCH} />
        <InfoItem title={'邮箱'} type={OPERATE_TYPE.WATCH} />
        <InfoItem title={'所在地'} type={OPERATE_TYPE.WATCH} />
        <InfoItem title={'描述'} type={OPERATE_TYPE.EDITOR} />
      </div>
    );
  }
}
