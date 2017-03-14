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
    sex: { type: String, enum: ['man', 'woman'] },
    identity: { type: Number, default: 1 },
    portrait: Buffer,
    description: String,
    location: String,
    fans: [Number],
    collections: [Number],
    commentbox: [Schema.Types.ObjectId],
    messagebox: [Schema.Types.ObjectId]
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
          tid: '13110033139',
          name: 'YangJi',
          pwd: md5('111111'),
          email: 'YangJi_1005@163.com',
          birthday: '1994-10-05',
          sex: 'man',
          identity: 1,
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
