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
    resetPwdTime: Number,
    validateCode: { type: String, default: '' },
    resetPwdCode: { type: String, default: '' },
    identity: { type: Number, default: 0 },
    portrait: String,
    description: String,
    location: String,
    followers: [{ type: String }],
    collections: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    commentbox: [],
    messagebox: []
  });

  studentSchema.statics.findStudent = function (student, cb) {   // eslint-disable-line
    this.findOne({
      name: student.name,
      pwd: student.pwd
    }, cb);
  };

  const Student = mongoose.model('student', studentSchema);
  // const gfs = Grid(mongoose.connection.db, mongoose.mongo); // eslint-disable-line
  // const writestream = gfs.createWriteStream({
  //   filename: 'logo',
  // });
  // console.log(__dirname + '..\\favicon');
  // fs.createReadStream(path.join(__dirname, '..', '..', '..', 'static', 'favicon.ico'))
  //   .pipe(writestream);
  // const readstream = gfs.createReadStream({
  //   _id: '0001adbb926bd600c8eec176'
  // });
  // console.log(readstream);
  // gfs.findOne({ filename: 'logo' }, (err, file) => {
  //   console.log(file);
  // });

  Student.find({}, (err, students) => {
    if (err) {
      console.error('==> Find Students Error.');
    } else {
      if (students.length === 0) {
        const student = new Student({
          sid: '13110033139',
          name: 'Student',
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
