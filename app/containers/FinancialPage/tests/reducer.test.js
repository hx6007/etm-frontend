
import { fromJS } from 'immutable';
import financialPageReducer from '../reducer';

describe('financialPageReducer', () => {
  it('returns the initial state', () => {
    expect(financialPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
