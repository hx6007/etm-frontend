
import { fromJS } from 'immutable';
import sonAccountEditPageReducer from '../reducer';

describe('sonAccountEditPageReducer', () => {
  it('returns the initial state', () => {
    expect(sonAccountEditPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
