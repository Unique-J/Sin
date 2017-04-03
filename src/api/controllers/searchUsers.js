import mongoose from 'mongoose';

// const searchUserById = (id, res) => {
//   const User = id.length === 6 ? mongoose.model('teacher') : mongoose.model('student');
//   const condition = id.length === 6 ? { tid: id } : { sid: id };

//   User.find(condition, (err, user) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.send(user);
//     }
//   });
// };

const searchUsers = (sid, condition, res) => {
  const Teacher = mongoose.model('teacher');
  const Student = mongoose.model('student');
  const searchCondition = [
    { name: { $regex: condition, $options: '$i' } },
  ];
  const teacherCondition = { tid: { $regex: condition, $options: '$i' } };
  const studentCondition = { sid: { $regex: condition, $options: '$i' } };
  // const nameReg = new RegExp(name);
  let users = [];

  Student.findOne({ sid }, (err, student) => {
    if (err) {
      console.log(err);
    } else {
      console.log(student);
      Teacher.find({
        tid: { $in: student.followers },
        $or: [...searchCondition, teacherCondition]
      }, (err1, teachers) => {
        if (err1) {
          console.error(err1);
        } else {
          // console.log('teachers');
          // console.log(teachers);
          Student.find({
            sid: { $in: student.followers },
            $or: [...searchCondition, studentCondition]
          }, (err2, students) => {
            if (err2) {
              console.error(err2);
            } else {
              // console.log('students');
              // console.log(students);
              users = [...teachers, ...students];
              res.send(users);
            }
          });
        }
      });
    }
  });
};

export default app => {
  app.post('/searchUsers', (req, res) => {
    const { sid, condition } = req.body;
    searchUsers(sid, condition, res);
  });
};
