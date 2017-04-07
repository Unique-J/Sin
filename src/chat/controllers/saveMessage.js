import mongoose from 'mongoose';

const createOrSaveMessage = (User, uid, msg) => {
  // const condition = uid.length === 6 ? { tid: uid } : { sid: uid };

  // User.findOne(condition, (err, user) => {
  //   if (err) {
  //     console.error(err);
  //   } else {

  //   }
  // });
};

export default msg => {
  const Teacher = mongoose.model('teacher');
  const Student = mongoose.model('student');

  const Sender = msg.senderid.length === 6 ? Teacher : Student;
  const Receiver = msg.receiverid.length === 6 ? Teacher : Student;
};
