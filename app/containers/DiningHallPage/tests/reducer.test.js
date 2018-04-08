
import { fromJS } from 'immutable';
import diningHallPageReducer from '../reducer';

describe('diningHallPageReducer', () => {
  it('returns the initial state', () => {
    expect(diningHallPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
