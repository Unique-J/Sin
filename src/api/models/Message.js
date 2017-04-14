import mongoose from 'mongoose';

export default function createMessage() {
  const Schema = mongoose.Schema;
  const messageSchema = Schema({  // eslint-disable-line
    senderid: String,
    sendername: String,
    senderportrait: String,
    // reviewernamea: String,
    receiverid: String,
    // reviewernameb: String,
    content: String,
    // replyContent: String,
    time: Date,
    // comments: [],
    // articleid: Schema.Types.ObjectId
  });

  const messagesSchema = Schema({  // eslint-disable-line
    mid: String,
    messages: [messageSchema]
  });

  const Message = mongoose.model('message', messagesSchema);  // eslint-disable-line
  // const MessageInBox = mongoose.model('messageinbox', messageSchema);  // eslint-disable-line

  // const message = new Message({
  //   senderid: '110001',
  //   receiverid: '13110033139',
  //   content: 'message',
  //   time: new Date()
  // });

  // Message.find({}, (error, messages) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     if (messages.length === 0) {
  //       message.save(err => {
  //         if (err) console.error(err);
  //         console.log('Save Message successfully.');
  //       });
  //     }
  //   }
  // });
}
