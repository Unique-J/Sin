import React, { Component, PropTypes } from 'react';
import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
import { customFetch } from '../../utils/utils';

const src = 'child.jpg';

export default class MyPortrait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  // uploadImg = () => {
  //   console.log(123);
  //   const portrait = this.refs.uploadForm;
  //   console.log(portrait);
    // const option = {
    //   method: 'post',
    //   headers: {
    //     // Accept: 'multipart/form-data',
    //     // 'Content-Type': 'multipart/form-data'
    //   },
    //   body: portrait
    // };
    // customFetch('/uploadPortrait', option);
  // }

  render() {
    const styles = require('./Cropper.scss');

    return (
      <div className={styles.my_portrait_container}>
        <form encType="multipart/form-data" ref="uploadForm">
          选择图片
          <input
            type="file"
            onChange={this.onChange}
            className={styles.select_btn}
          />
        </form>
        <button
          className={styles.select_btn}
          onClick={this.uploadImg}
        >上传</button >
      </div>
    );
  }
}
