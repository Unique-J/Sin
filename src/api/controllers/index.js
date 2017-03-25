import counter from './counter';
import loadAuth from './loadAuth';
import login from './login';
import logout from './logout';
import judgeUserRegistered from './judgeUserRegistered';
import registerUser from './registerUser';
import validateEmail from './validateEmail';
import saveArticle from './saveArticle';
import getArticles from './getArticles';
import getArticle from './getArticle';
import getTeachers from './getTeachers';
import getArticlesByTid from './getArticlesByTid';
import getStudent from './getStudent';
import collectArticle from './collectArticle';
import cancelCollectArticle from './cancelCollectArticle';
import followTeacher from './followTeacher';
import cancelFollowTeacher from './cancelFollowTeacher';
import getComments from './getComments';
import saveComment from './saveComment';
import saveChildComment from './saveChildComment';

export default app => {
  loadAuth(app);
  login(app);
  logout(app);
  judgeUserRegistered(app);
  registerUser(app);
  validateEmail(app);

  // Validate

  app.use((req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  });

  counter(app);
  saveArticle(app);
  getArticles(app);
  getArticle(app);
  getArticlesByTid(app);
  getTeachers(app);
  getStudent(app);
  collectArticle(app);
  cancelCollectArticle(app);
  followTeacher(app);
  cancelFollowTeacher(app);
  getComments(app);
  saveComment(app);
  saveChildComment(app);
};
