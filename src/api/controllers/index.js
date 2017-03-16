import counter from './counter';
import loadAuth from './loadAuth';
import login from './login';
import logout from './logout';
import judgeUserRegistered from './judgeUserRegistered';
import registerUser from './registerUser';

export default app => {
  loadAuth(app);
  login(app);
  logout(app);
  judgeUserRegistered(app);
  registerUser(app);

  app.use((req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  });

  counter(app);
};
