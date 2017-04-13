import mongoose from 'mongoose';

export default app => {
  app.post('/uploadPortrait', (req, res) => {
    // console.log('portrait:');
    // console.log(portrait);
    // const client = qn.create({
    //   accessKey: '_PtbiI058kdoeSOQ1-fLGedksZKNm5wiWL8R-qgf',
    //   secretKey: '4xTltfdRp2dF4MzciCFNvzfd_b8ZaixwaBplQT2Z',
    //   bucket: 'sinblog',
    //   origin: '',
    // });
    // // 上传单个文件
    // // 这里`image`对应前端form中input的name值
    // upload.single('cropPortrait')(req, res, error => {
    //   if (error) {
    //     console.log(123);
    //     console.error(error);
    //   }
    //   if (req.file && req.file.buffer) {
    //     // 上传到七牛
    //     client.upload(req.file.buffer, { key: '/upload/' + new Date().getTime() },
    //     (err, result) => {
    //       if (err) {
    //         res.json({ code: 1, msg: '上传失败！', data: { src: '' } });
    //       }
    //       res.json({ code: 0, msg: '上传成功！', data: { src: result.url + '?imageslim' } });
    //     });
    //   }
    // });



    const { uid, portrait } = req.body;
    const User = uid.length === 6 ? mongoose.model('teacher') : mongoose.model('student');

    const condition = uid.length === 6 ? { tid: uid } : { sid: uid };
    const update = { $set: { portrait } };

    User.update(condition, update, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result.n === 0) {
          res.json({ success: false });
          console.info('Update Portrait Failed.');
          return;
        }
        res.json({ success: true });
        console.info('Update Portrait Successfully.');
      }
    });
  });
};
