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
import getArticlesBySid from './getArticlesBySid';
import getStudent from './getStudent';
import collectArticle from './collectArticle';
import cancelCollectArticle from './cancelCollectArticle';
import followTeacher from './followTeacher';
import cancelFollowTeacher from './cancelFollowTeacher';
import getComments from './getComments';
import saveComment from './saveComment';
import saveChildComment from './saveChildComment';
import getCommentbox from './getCommentbox';
import getComment from './getComment';
import getPerson from './getPerson';
import searchTeachers from './searchTeachers';
import searchStudents from './searchStudents';
import searchArticles from './searchArticles';
import getCollections from './getCollections';
import getFollowers from './getFollowers';
import searchUsers from './searchUsers';
import getUserFollowers from './getUserFollowers';
import getMessages from './getMessages';
import getMessageBox from './getMessageBox';
import getUser from './getUser';
import resetPassword from './resetPassword';
import updatePassword from './updatePassword';

export default app => {
  loadAuth(app);
  login(app);
  logout(app);
  judgeUserRegistered(app);
  registerUser(app);
  validateEmail(app);
  getUser(app);
  resetPassword(app);
  updatePassword(app);

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
  getArticlesBySid(app);
  getTeachers(app);
  getStudent(app);
  collectArticle(app);
  cancelCollectArticle(app);
  followTeacher(app);
  cancelFollowTeacher(app);
  getComments(app);
  saveComment(app);
  saveChildComment(app);
  getCommentbox(app);
  getComment(app);
  getPerson(app);
  searchTeachers(app);
  searchStudents(app);
  searchArticles(app);
  getCollections(app);
  getFollowers(app);
  searchUsers(app);
  getUserFollowers(app);
  getMessages(app);
  getMessageBox(app);
};
