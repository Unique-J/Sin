import expect from 'expect';
import dashboard from '../../src/reducers/dashboard';
import { SHOW_ARTICLE_MODAL, SHOW_EDITOR } from '../../src/actions/dashboard';

describe('reducers', () => {
  describe('dashboard', () => {
    it('should handle SHOW_ARTICLE_MODAL action [show]', () => {
      expect(dashboard({
        showArticleModalFlag: false
      }, { type: SHOW_ARTICLE_MODAL })).toEqual({
        showArticleModalFlag: true
      });
    });

    it('should handle SHOW_ARTICLE_MODAL action [not show]', () => {
      expect(dashboard({
        showArticleModalFlag: true
      }, { type: SHOW_ARTICLE_MODAL })).toEqual({
        showArticleModalFlag: false
      });
    });

    it('should handle SHOW_EDITOR action [show]', () => {
      expect(dashboard({
        showEditorFlag: false
      }, { type: SHOW_EDITOR })).toEqual({
        showEditorFlag: true
      });
    });

    it('should handle SHOW_EDITOR action [not show]', () => {
      expect(dashboard({
        showEditorFlag: false
      }, { type: SHOW_EDITOR })).toEqual({
        showEditorFlag: true
      });
    });
  });
});
