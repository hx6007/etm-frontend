
import { fromJS } from 'immutable';
import sonAccountPageReducer from '../reducer';

describe('sonAccountPageReducer', () => {
  it('returns the initial state', () => {
    expect(sonAccountPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
