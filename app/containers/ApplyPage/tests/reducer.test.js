
import { fromJS } from 'immutable';
import applyPageReducer from '../reducer';

describe('applyPageReducer', () => {
  it('returns the initial state', () => {
    expect(applyPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
