
import { fromJS } from 'immutable';
import addressEditPageReducer from '../reducer';

describe('addressEditPageReducer', () => {
  it('returns the initial state', () => {
    expect(addressEditPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
