import React, { Component, PropTypes } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

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

  render() {
    const styles = require('./Cropper.scss');

    return (
      <div className={styles.my_portrait_container}>
        <div className={styles.select_btn_wrapper}>
          选择图片
          <input
            type="file"
            onChange={this.onChange}
            className={styles.select_btn}
          />
        </div>
        <div className={styles.crop_container}>
          <div className={styles.crop_wrapper}>
            <Cropper
              style={{ height: 300, width: 400, background: 'red' }}
              aspectRatio={1 / 1}
              preview=".img-preview"
              guides={false}
              src={this.state.src}
              ref={cropper => { this.cropper = cropper; }}
            />
          </div>
          <div className={styles.preview_wrapper}>
            <div className="box" style={{ background: 'red', flex: 1 }}>
              <div className="img-preview" style={{ height: 300, overflow: 'hidden' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
