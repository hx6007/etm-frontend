
import { fromJS } from 'immutable';
import perOrderListPageReducer from '../reducer';

describe('perOrderListPageReducer', () => {
  it('returns the initial state', () => {
    expect(perOrderListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
