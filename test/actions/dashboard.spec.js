import expect from 'expect';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import * as actions from '../../src/actions/dashboard';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

describe('actions', () => {
  describe('dashboard', () => {
    it('showArticleModal should create the showArticleModal action', () => {
      expect(actions.showArticleModal()).toEqual({ type: actions.SHOW_ARTICLE_MODAL });
    });

    it('showEidtor should create the showEditor action', () => {
      expect(actions.showEditor()).toEqual({ type: actions.SHOW_EDITOR });
    });
  });
});
