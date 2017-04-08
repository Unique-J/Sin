import mongoose from 'mongoose';
import { createMessageId } from '../../utils/utils';

const saveMessageBox = (User, msg) => {
  const uid = msg.receiverid;

  const updateCondition = {
    'messagebox.senderid': msg.senderid,
    'messagebox.receiverid': msg.receiverid };
  const findCondition = uid.length === 6 ? { tid: uid } : { sid: uid };

  const updateSet = { $set: {
    'messagebox.$.content': msg.content,
    'messagebox.$.time': (new Date()).toJSON()
  } };
  const updatePush = { $push: { messagebox: msg } };
  // $push: { messagebox: mid }

  // User.update(condition, update, { upsert: true }, err => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('Save CommentBox Successfully.');
  //   }
  // });
  User.findOne(updateCondition, (error, user) => {
    if (error) {
      console.error(error);
    } else {
      console.log(user);
      if (user) {
        User.update(updateCondition, updateSet, err1 => {
          if (err1) {
            console.error(err1);
          } else {
            console.log('Update CommentBox Successfully.');
          }
        });
      } else {
        User.update(findCondition, updatePush, err2 => {
          if (err2) {
            console.error(err2);
          } else {
            console.log('Save CommentBox Successfully.');
          }
        });
      }
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
      saveMessageBox(Receiver, msg);
      console.log('Save Message Successfully.');
    }
  });
};
