
import { fromJS } from 'immutable';
import productDetailPageReducer from '../reducer';

describe('productDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(productDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
