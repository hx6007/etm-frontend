
import { fromJS } from 'immutable';
import crowdfundPageReducer from '../reducer';

describe('crowdfundPageReducer', () => {
  it('returns the initial state', () => {
    expect(crowdfundPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
