import counter from './counter';
import loadAuth from './loadAuth';
import login from './login';
import logout from './logout';

export default app => {
  loadAuth(app);
  login(app);
  logout(app);

  app.use((req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  });

  counter(app);
};
