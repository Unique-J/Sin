import mongoose from 'mongoose';
import md5 from 'md5';

export default function createStudent() {
  const Schema = mongoose.Schema;
  const studentSchema = Schema({ // eslint-disable-line
    sid: { type: String, required: true, unique: true },
    name: String,
    pwd: String,
    email: String,
    birthday: String,
    gender: { type: String, enum: ['male', 'female'] },
    createTime: Number,
    validateCode: { type: String, default: '' },
    identity: { type: Number, default: 0 },
    portrait: Buffer,
    description: String,
    location: String,
    followers: [Number],
    collections: [Number],
    commentbox: [Schema.Types.ObjectId],
    messagebox: [Schema.Types.ObjectId]
  });

  studentSchema.statics.findStudent = function (student, cb) {   // eslint-disable-line
    this.findOne({
      name: student.name,
      pwd: student.pwd
    }, cb);
  };

  const Student = mongoose.model('student', studentSchema);

  Student.find({}, (err, students) => {
    if (err) {
      console.error('==> Find Students Error.');
    } else {
      if (students.length === 0) {
        const student = new Student({
          sid: '13110033139',
          name: 'YangJi',
          pwd: md5('111111'),
          email: 'YangJi_1005@163.com',
          birthday: '1994-10-05',
          gender: 'male',
          identity: 0,
          createTime: new Date().getTime(),
          description: '321',
          location: '浙江嘉兴',
        });
        student.save((error) => {
          if (error) {
            console.error(error);
          } else {
            console.info('==> Save Student successfully.');
          }
        });
      }
    }
  });
}
