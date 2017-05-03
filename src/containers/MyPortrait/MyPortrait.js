import React, { Component, PropTypes } from 'react';
import Cropper from 'react-cropper';
import { variable } from './const';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/myPortrait';

const { src, style } = variable;

@connect(
  state => ({
    user: state.async.login,
    upload: state.async.upload,
  }),
  actionCreators
)
export default class MyPortrait extends Component {
  static propTypes = {
    upload: PropTypes.any,
    uploadPortrait: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    // this.cropImage = this.cropImage.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
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

  cropImage = () => {
    // const croppedCanvas = this.cropper.getCroppedCanvas();
    // if (typeof croppedCanvas === 'undefined') {
    //   return;
    // }
    // const cropResult = croppedCanvas.toDataURL();
    // this.setState({
    //   cropResult
    // });
    // console.log(this.cropper.getCroppedCanvas().toDataURL());
    // const { uploadPortrait } = this.props;
    // uploadPortrait(cropResult);

    // console.log(this.state.cropResult);
    // const { uploadPortrait } = this.props;
    // this.cropper.getCroppedCanvas().toBlob(blob => {
    //   const formData = new FormData();

    //   formData.append('portrait', blob);
    //   uploadPortrait(formData);
    // });
    // console.log(132);
  }

  uploadPortrait = () => {
    const { uploadPortrait } = this.props;
    const uid = user.sid || user.tid;

    const croppedCanvas = this.cropper.getCroppedCanvas();
    if (typeof croppedCanvas === 'undefined') {
      return;
    }

    const cropResult = croppedCanvas.toDataURL();
    uploadPortrait(uid, cropResult);
  }

  render() {
    const styles = require('./MyPortrait.scss');

    return (
      <div className={styles.my_portrait_container}>
        <div className={styles.crop_container}>
          <div className={styles.crop_wrapper}>
            <Cropper
              style={style.cropper}
              aspectRatio={1 / 1}
              preview=".img-preview"
              src={this.state.src}
              viewMode={1}
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
                <div className={styles.img_tip} style={{ fontSize: 12 }}>大尺寸头像，150×150像素</div>
              </div>
              <div className={styles.preview_right_wrapper}>
                <div className={styles.simple_size_wrapper}>
                  <div className="img-preview" style={style.imgPreviewR1} />
                  <div className={styles.img_tip}>中尺寸头像 50×50像素</div>
                </div>
                <div className={styles.small_size_wrapper}>
                  <div className="img-preview" style={style.imgPreviewR2} />
                  <div className={styles.img_tip}>小尺寸头像 37×37像素</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form className={styles.btn_wrapper} ref="uploadForm" encType="multipart/form-data">
          <span className={styles.select_btn_wrapper}>
            选择图片
            <input
              type="file"
              name="cropPortrait"
              onChange={this.onChange}
              className={styles.select_btn}
            />
          </span>
          <span
            className={styles.select_btn_wrapper}
            onClick={this.uploadPortrait}
          >
            保存
            <button
              className={styles.select_btn}
            />
          </span>
        </form>

        {/* {<div className="box" style={{ width: '50%', float: 'right' }}>
          <h1>
            <span>Crop</span>
            <button onClick={this.cropImage} style={{ float: 'right' }}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped" />
        </div>}*/}
      </div>
    );
  }
}
