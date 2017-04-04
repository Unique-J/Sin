import mongoose from 'mongoose';

export default function createMessage() {
  const Schema = mongoose.Schema;
  const messageSchema = Schema({  // eslint-disable-line
    senderid: String,
    // reviewernamea: String,
    receiverid: String,
    // reviewernameb: String,
    content: String,
    // replyContent: String,
    time: Date,
    // comments: [],
    // articleid: Schema.Types.ObjectId
  });

  const Message = mongoose.model('message', messageSchema);

  const message = new Message({
    senderid: '110001',
    receiverid: '13110033139',
    content: 'message',
    time: new Date()
  });

  Message.find({}, (error, messages) => {
    if (error) {
      console.error(error);
    } else {
      if (messages.length === 0) {
        message.save(err => {
          if (err) console.error(err);
          console.log('Save Message successfully.');
        });
      }
    }
  });
}
