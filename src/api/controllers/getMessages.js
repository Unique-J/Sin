import mongoose from 'mongoose';

export default app => {
  app.post('/getMessages', (req, res) => {
    const { mid, number } = req.body;
    const Message = mongoose.model('message');

    Message.findOne({ mid }, (err, message) => {
      if (err) {
        console.error(err);
      } else {
        if (message) {
          const length = message.messages.length;
          // console.log(message.messages.slice(length - number, length));
          // res.send(message.messages.reverse().slice(0, number));

          // res.send(message.messages.slice(length - number, length));
          res.send(message.messages.slice(0, length));
        } else {
          res.send(null);
        }
      }
    });
  });
};
