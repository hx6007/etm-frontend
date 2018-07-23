
import { fromJS } from 'immutable';
import jinXiaoCunSearchPageReducer from '../reducer';

describe('jinXiaoCunSearchPageReducer', () => {
  it('returns the initial state', () => {
    expect(jinXiaoCunSearchPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
