import expect from 'expect';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import * as actions from '../../src/actions/articleDetail';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

describe('actions', () => {
  describe('articleDetail', () => {
    it('showEditor should create the showEditor action', () => {
      expect(actions.showEditor()).toEqual({ type: actions.SHOW_EDITOR });
    });
  });
});
