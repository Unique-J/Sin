import mongoose from 'mongoose';
import md5 from 'md5';

export default function createTeacher() {
  const Schema = mongoose.Schema;
  const teacherSchema = Schema({ // eslint-disable-line
    tid: { type: String, required: true, unique: true },
    name: String,
    pwd: String,
    email: String,
    birthday: String,
    gender: { type: String, enum: ['male', 'female'] },
    identity: { type: Number, default: 1 },
    createTime: Number,
    validateCode: { type: String, default: '' },
    portrait: Buffer,
    description: String,
    location: String,
    fans: [Number],
    collections: [Number],
    commentbox: [],
    messagebox: []
  });

  teacherSchema.statics.findTeacher = function (teacher, cb) {   // eslint-disable-line
    this.findOne({
      name: teacher.name,
      pwd: teacher.pwd
    }, cb);
  };

  const Teacher = mongoose.model('teacher', teacherSchema);

  Teacher.find({}, (err, teachers) => {
    if (err) {
      console.error('==> Find Teachers Error.');
    } else {
      if (teachers.length === 0) {
        const teacher = new Teacher({
          tid: '110001',
          name: 'YangJi',
          pwd: md5('111111'),
          email: 'YangJi_1005@163.com',
          birthday: '1994-10-05',
          gender: 'male',
          identity: 1,
          createTime: new Date().getTime(),
          description: '123',
          location: '浙江嘉兴',
        });
        teacher.save((error) => {
          if (error) {
            console.error(error);
          } else {
            console.info('==> Save Teacher successfully.');
          }
        });
      }
    }
  });
}
