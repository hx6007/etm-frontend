
import { fromJS } from 'immutable';
import perOrderDetailPageReducer from '../reducer';

describe('perOrderDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(perOrderDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
