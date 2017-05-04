import mongoose from 'mongoose';

export default app => {
  app.get('/validateemail', (req, res) => {
    // res.send(req.query.validate);
    const userid = req.query.userid;
    const validateCode = req.query.validateCode;
    // console.log(userid);
    const email = req.query.email + '.com';
    if (!userid || !validateCode || !email) {
      res.send(404);
      return;
    }
    // console.log(userid + ' ' + validateCode + ' ' + email);
    const useridLength = userid.length;

    const validateTime = new Date().getTime();
    const limitTime = 3600000000000;
    const deltaTime = validateTime - limitTime;
    // console.log(deltaTime);

    const condition = useridLength === 6 ? { tid: userid } : { sid: userid };
    const conditions = {
      ...condition,
      validateCode,
      createTime: { $gte: deltaTime }
    };
    const update = {
      $set: {
        email,
        createDate: new Date().getTime()
      }
    };

    if (useridLength === 6) {
      const Teacher = mongoose.model('teacher');
      // Teacher.findOne(conditions, (err, teacher) => {
      //   if (err) console.error(err);
      //   // console.log(teacher);
      // });
      Teacher.update(conditions, update,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            if (result.n === 0) {
              res.send('验证邮箱失败...');
            } else {
              res.send('验证邮箱成功，请登录...');
            }
          }
        }
      );
    }

    if (useridLength === 11) {
      const Student = mongoose.model('student');
      Student.update(conditions, update,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            if (result.n === 0) {
              res.send('验证邮箱失败...');
            } else {
              // console.log(123);
              res.send('验证邮箱成功，请登录...');
            }
          }
        }
      );
    }
    // res.send(`${validateCode}
    //  ${userid}`);
    // console.log(req.query.validate);
    // res.send(req.query.validate);
  });
};
