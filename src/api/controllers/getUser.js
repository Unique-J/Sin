// import mongoose from 'mongoose';

// export default app => {
//   app.post('/getUser', (req, res) => {
//     const { uid, email } = req.body;
//     // console.log(condition);
//     // console.log(uid + ' ' + email);
//     // console.log(uid.length);

//     if (uid.length !== 6 && uid.length !== 11) {
//       // console.log(1);
//       res.send({});
//       return;
//     }
//     if (uid.length === 6) {
//       const Teacher = mongoose.model('teacher');
//       Teacher.findOne({ tid: uid, email }, (err, teacher) => {
//         if (err) {
//           console.error(err);
//         } else {
//           // let users = [...teachers];
//           // console.log(teachers);
//           // console.log(2);
//           if (teacher) {
//             res.send(teacher);
//             return;
//           }
//           res.send({});
//           return;
//         }
//       });
//     }
//     if (uid.length === 11) {
//       const Student = mongoose.model('student');
//       Student.findOne({ sid: uid, email }, (err, student) => {
//         if (err) {
//           console.error(err);
//         } else {
//           // const users = [...teachers, ...students];
//           // console.log(users);
//           // console.log(3);
//           if (student) {
//             res.send(student);
//             return;
//           }
//           res.send({});
//           return;
//         }
//       });
//     }
//   });
// };
