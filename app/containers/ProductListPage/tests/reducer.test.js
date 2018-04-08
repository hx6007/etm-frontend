
import { fromJS } from 'immutable';
import productListPageReducer from '../reducer';

describe('productListPageReducer', () => {
  it('returns the initial state', () => {
    expect(productListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
