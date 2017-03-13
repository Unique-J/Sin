import mongoose from 'mongoose';
import md5 from 'md5';

export default function createUser() {
  const userSchema = mongoose.Schema({ // eslint-disable-line
    username: String,
    pwd: String
  });

  userSchema.statics.findUser = function (user, cb) {   // eslint-disable-line
    this.findOne({ username: user.username, pwd: user.pwd }, cb);
  };

  const User = mongoose.model('user', userSchema);

  // const user = new User({
  //   username: 'Ji',
  //   pwd: md5('111111')
  // });
  // user.save((err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.info('succeed');
  //   }
  // });
}
