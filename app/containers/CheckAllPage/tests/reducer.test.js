
import { fromJS } from 'immutable';
import checkAllPageReducer from '../reducer';

describe('checkAllPageReducer', () => {
  it('returns the initial state', () => {
    expect(checkAllPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
