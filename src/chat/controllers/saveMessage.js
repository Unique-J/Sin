import mongoose from 'mongoose';
// import { createMessageId } from '../../utils/utils';

const saveMessageBox = (User, msg, mid) => {
  const uid = msg.receiverid;
  // const condition = uid.length === 6 ? { tid: uid } : { sid: uid };
  const condition = { 'messagebox.mid': mid };
  const update = { $addToSet: { 'messagebox.$.content': msg.content } };
  // $push: { messagebox: mid }

  // User.update(condition, update, { upsert: true }, err => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('Save CommentBox Successfully.');
  //   }
  // });
  User.findOne(condition, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      console.log(user);
    }
  });
};

export default msg => {
  const Teacher = mongoose.model('teacher');
  const Student = mongoose.model('student');

  // const Sender = msg.senderid.length === 6 ? Teacher : Student;
  const Receiver = msg.receiverid.length === 6 ? Teacher : Student;

  const Message = mongoose.model('message');
  const mid = createMessageId(msg.senderid, msg.receiverid);
  // console.log(mid);
  const update = { $push: { messages: msg } };

  Message.update({ mid }, update, { upsert: true }, err => {
    if (err) {
      console.error(err);
    } else {
      // saveMessageBox(Sender, msg.senderid, mid);
      saveMessageBox(Receiver, msg, mid);
      console.log('Save Message Successfully.');
    }
  });
};
