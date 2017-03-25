import mongoose from 'mongoose';

// function mapComment(comment) {
//   let newComment = Object.assign({}, comment);
//   const Student = mongoose.model('student');
//   const Teacher = mongoose.model('teacher');
//   // console.log(1);
//   // console.log(newComment);
//   if (comment.reviewerida.length === 11) {
//     Student.findOne({ sid: comment.reviewerida }, (err1, student) => {
//       if (err1) {
//         console.error(err1);
//       } else {
//         // console.log(student);
//         // newComment.reviewernamea = student.name;
//         newComment = Object.assign(newComment, { reviewernamea: student.name });

//         Teacher.findOne({ tid: comment.revieweridb }, (err2, teacher) => {
//           if (err2) {
//             console.error(err2);
//           } else {
//             // newComment.reviewernameb = teacher.name;
//             newComment = Object.assign(newComment, { reviewernameb: teacher.name });
//             // console.log(2);
//             // console.log(teacher);
//             // console.log(3);
//             // console.log(newComment);
//             // console.log(4);
//           }
//           return newComment;
//         });
//       }
//     });
//   }
//   if (comment.reviewerida.length === 6) {
//     // console.log(2);
//     Teacher.findOne({ tid: comment.reviewerida }, (err1, teacher) => {
//       if (err1) {
//         console.error(err1);
//       } else {
//         // newComment.reviewernamea = teacher.name;
//         newComment = Object.assign(newComment, { reviewernamea: teacher.name });

//         Student.findOne({ tid: comment.revieweridb }, (err2, student) => {
//           if (err2) {
//             console.error(err2);
//           } else {
//             // newComment.reviewernameb = student.name;
//             newComment = Object.assign(newComment, { reviewernameb: student.name });
//           }
//           return newComment;
//         });
//       }
//     });
//   }
// }

export default app => {
  app.post('/getComments', (req, res) => {
    const { articleid } = req.body;
    // console.log(articleid);

    const Comment = mongoose.model('comment');
    Comment.find({ articleid }, (err, comments) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(comments);
        res.send(comments);
      }
    }).sort({ time: -1 });
  });
};
