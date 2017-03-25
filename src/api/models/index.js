import createStudent from './Student';
import createTeacher from './Teacher';
import createArticle from './Article';
import createComment from './Comment';

export function createModels() {
  createStudent();
  createTeacher();
  createArticle();
  createComment();
}
