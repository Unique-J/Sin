import React, { Component, PropTypes } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const src = 'child.jpg';

const style = {
  cropper: {
     height: 300,
     width: 550,
     margin: '0 auto'
  },
  box: {
    // width: '50%'
    display: 'flex',
  },
  imgPreviewC: {
    width: 180,
    height: 180,
    overflow: 'hidden',
    borderRadius: '50%'
  },
  imgPreviewR1: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 2
  },
  imgPreviewR2: {
    width: 30,
    height: 30,
    overflow: 'hidden',
  }
}

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
    const styles = require('./MyPortrait.scss');

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
              style={style.cropper}
              aspectRatio={1 / 1}
              preview=".img-preview"
              src={this.state.src}
              viewMode={3}
              autoCropArea={0.5}
              ref={cropper => { this.cropper = cropper; }}
            />
          </div>
          <div className={styles.preview_wrapper}>
            <div className={styles.tip}>
              您上传的图片将会自动生成三种尺寸的头像，请注意各尺寸头像是否清晰
            </div>
            <div className="box" style={style.box}>
              <div className={styles.preview_left_wrapper}>
                <div className="img-preview" style={style.imgPreviewC} />
              </div>
              <div className={styles.preview_right_wrapper}>
                <div className="img-preview" style={style.imgPreviewR1} />
                <div className="img-preview" style={style.imgPreviewR2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
