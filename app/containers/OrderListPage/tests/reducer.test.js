
import { fromJS } from 'immutable';
import orderListPageReducer from '../reducer';

describe('orderListPageReducer', () => {
  it('returns the initial state', () => {
    expect(orderListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
