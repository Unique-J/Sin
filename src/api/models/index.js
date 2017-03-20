import createStudent from './Student';
import createTeacher from './Teacher';
import createArticle from './Article';

export function createModels() {
  createStudent();
  createTeacher();
  createArticle();
}
