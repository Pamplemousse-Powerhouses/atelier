import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import '@testing-library/jest-dom';

import ratingsReviewsReducer from '../reducers/index';
import { fetchMetadata } from '../actions/index';

import testdata from '../testData/metaData.json';

const testState = {
  reviewViewLength: 2,
  reviews: {
    product: 0,
    page: 0,
    count: 0,
    results: [],
  },
  meta: {
    product_id: '0',
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    recommend: {
      false: 0,
      true: 0,
    },
    characteristics: {
      Size: {
        id: 0,
        value: 2.511111,
      },
    },
  },
  sortOption: 'relevant', // [newest, helpful, relevant]
  filter: false,
  sort: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  },
  rloading: true,
  mloading: true,
  error: null,
};

jest.mock('axios');

export default () => {
  describe('Metadata component mocks', () => {
    let store;
    let currentState;

    it('should render an initial state', async () => {
      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));

      expect(store.getState()).toEqual(testState);
    });

    it('should set state.meta data after succesful axios call', async () => {
      axios.mockResolvedValue({ data: testdata });

      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));
      await store.dispatch(fetchMetadata(40344));
      currentState = store.getState();

      expect(currentState.meta.product_id).toBe('40346');
      expect(currentState.meta.recommended.false).toBe('69');
      expect(currentState.meta.characteristics.Fit.id).toBe(135224);
    });

    it('should set state.error data after failed axios call', async () => {
      axios.mockRejectedValue(new Error('error'));

      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));
      await store.dispatch(fetchMetadata(40344));
      await store.getState();

      await expect(store.getState().error).toBe('error');
    });
  });
};
