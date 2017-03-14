import mongoose from 'mongoose';
import md5 from 'md5';

export default app => {
  app.post('/login', (req, res) => {
    const user = {
      name: req.body.name,
      pwd: md5(req.body.pwd)
    };
    console.log(user);
    const User = mongoose.model('user');
    User.findUser(user, (err, users) => {
      console.log(users);
      if (users) {
        console.log('success');
        const session = req.session;
        session.user = user;
        res.json(user);
      } else {
        console.log('fail');
        res.json(null);
      }
    });
  });
};
