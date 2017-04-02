import mongoose from 'mongoose';

export default app => {
  app.post('/getFollowers', (req, res) => {
    const { sid } = req.body;
    const Student = mongoose.model('student');
    const Teacher = mongoose.model('teacher');

    Student.findOne({ sid }, (error, student) => {
      if (error) {
        console.error(error);
      } else {
        // console.log(student);
        let followers = [];
        Student.find({ sid: { $in: student.followers } }, (err1, students) => {
          if (err1) {
            console.error(err1);
          } else {
            followers = [...students];
            Teacher.find({ tid: { $in: student.followers } }, (err2, teachers) => {
              if (err2) {
                console.error(err2);
              } else {
                followers = [...teachers];
                // console.log(followers);
                res.send(followers);
              }
            });
          }
        });
      }
    });
  });
};
