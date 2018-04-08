
import { fromJS } from 'immutable';
import diningHallDetailPageReducer from '../reducer';

describe('diningHallDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(diningHallDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
