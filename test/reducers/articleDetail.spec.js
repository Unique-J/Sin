import expect from 'expect';
import articleDetail from '../../src/reducers/articleDetail';
import { SHOW_EDITOR } from '../../src/actions/articleDetail';

describe('reducers', () => {
  describe('articleDetail', () => {
    it('should handle SHOW_EDITOR action [show]', () => {
      expect(articleDetail({
        showEditorFlag: false
      }, { type: SHOW_EDITOR })).toEqual({
        showEditorFlag: true
      });
    });

    it('should handle SHOW_EDITOR action [not show]', () => {
      expect(articleDetail({
        showEditorFlag: false
      }, { type: SHOW_EDITOR })).toEqual({
        showEditorFlag: true
      });
    });
  });
});
