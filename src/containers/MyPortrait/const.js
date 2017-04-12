const src = 'child.jpg';

const style = {
  cropper: {
    height: 250,
    width: 500,
    margin: '0 auto'
  },
  box: {
    // width: '50%'
    display: 'flex',
  },
  imgPreviewC: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '10px 15px',
  },
  imgPreviewR1: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 2,
    margin: '0 10px',
  },
  imgPreviewR2: {
    width: 37,
    height: 37,
    overflow: 'hidden',
    margin: '0 16px',
  }
};

export const variable = {
  src,
  style,
};
